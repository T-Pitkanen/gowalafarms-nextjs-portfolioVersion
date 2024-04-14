import { exit } from 'process';
import dbConnect from '../dbConnect.mjs';
import { seedDefaultOrder} from './seedhelpers.mjs';
import { createDummyOrderWithProductId, subscribers } from './seedfile.mjs';



/* 

    SEED

*/

// Database Connection
await dbConnect();

// subscriber

let order = createDummyOrderWithProductId('65faf75b76c3a3e610f12c35')
let newOrder = await seedDefaultOrder(order);

exit();