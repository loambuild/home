import equal from 'fast-deep-equal'
import {
  ContractMethodGroup,
  ContractInterface,
  init,
  getSchema,
  getSchemaCached,
  SchemaInterface,
} from "../protocols/near";

export async function get({ request }) {
  const contract = 'counter.raendev.testnet'
  const responseData = {
    message: "The contract is: " + contract
  }

  const freshSchema = await getSchema(contract)
    // setSchema({
    //   ...cache,
    //   [contract]: {
    //     ...init(contract),
    //     ...freshSchema,
    //   }
    // })
    console.log('[[[freshSchema]]]', freshSchema)

  return new Response(JSON.stringify(responseData), { status: 200 });
}