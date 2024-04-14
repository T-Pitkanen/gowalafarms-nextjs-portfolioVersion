import { getEmployee, createEmployee, updateEmployee, deleteEmployee } from "@/lib/data.service";
import { deleteFile, fileHandler } from "@/lib/files/fileHandler";
import { NextResponse } from "next/server"

// Get Employee.
export async function GET(request) {
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    let employee = await getEmployee(id);
    
    return NextResponse.json(employee);

}

// Create new Employee.
export async function POST(request) {

    const data = await request.formData();
    const array = new Uint32Array(1);
    const postfix = crypto.getRandomValues(array)[0];

    const file = data.get('file');
    const name = data.get('name');
    const position = data.get('position');
    const description = data.get('description');

    const folder = "employees";
    const fileName = `employee_${postfix}`;


    const newEmployee = {
        name: name,
        position: position,
        description: description,
    }

    // Hvis der er en fil, så opdaterer vi den.
    if(file && file.name !== '')
    {
        let extension = file ? file.type.split('/')[1] : null;

        //TODO: Add validation for file type
        extension = extension === 'jpeg' ? 'jpg' : extension; 
        newEmployee.imagePath = `/${folder}/${fileName}.${extension}`;
        let result = await fileHandler({file, folder, fileName});
    }
   
    let employee = await createEmployee(newEmployee);

    return NextResponse.json({'ok': true, 'message': 'Employee created'});

    
}

// Update Product.
export async function PUT(request) {

    const data = await request.formData();
    const array = new Uint32Array(1);
    const postfix = crypto.getRandomValues(array)[0];

    const id = data.get('id');
    const file = data.get('file');
    const name = data.get('name');
    const position = data.get('position');
    const description = data.get('description');
    
    const folder = "employees";
 

    // Henter det nuværende product.
    let pro = await getEmployee(id);

 
    
    // Opretter et nyt review objekt.
    const newEmployee = {
        id: pro._id,
        name: name || pro.name,
        position: position || pro.position,
        description: description || pro.description,
        imagePath : pro.imagePath
    }

    // Hvis der er en fil, så opdaterer vi den.
    if(file && file.name)
    {
        let extension = file ? file.type.split('/')[1] : null;

        //TODO: Add validation for file type
        extension = extension === 'jpeg' ? 'jpg' : extension;
        const fileName = `employee_${postfix}`;
        newEmployee.imagePath = `/${folder}/${fileName}.${extension}`;

        let deleteImage = await deleteFile(pro.imagePath);
        let result = await fileHandler({file, folder, fileName});
        
    }

    // Opdaterer Employee  .
    let updPro = await updateEmployee(newEmployee);
    
    return NextResponse.json({'ok': true, 'message': 'Employee updated'});

}

// Delete Product.
export async function DELETE(request) {

    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const deleted = await deleteEmployee(id);
    let deleteImage = deleteFile(deleted.imagePath);
    
    return NextResponse.json({'ok': true, 'message': `Product deleted and image deleted for: ${deleted.name}`});

}