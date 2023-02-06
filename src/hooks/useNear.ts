import equal from 'fast-deep-equal'
import { useEffect, useState } from "react"
import { useParams } from "../utils"
import {
  ContractMethodGroup,
  ContractInterface,
  init,
  getSchema,
  getSchemaCached,
  SchemaInterface,
} from "../protocols/near"

const stub = {
  contract: undefined,
  config: undefined,
  near: undefined,
  currentUser: Promise.resolve(undefined),
  signIn: () => { },
  signOut: () => { },
  schema: undefined,
  methods: [] as ContractMethodGroup[],
  getMethod: () => undefined,
  getDefinition: () => undefined,
  canCall: () => Promise.resolve([true, undefined] as const),
} as const

export const get: APIRoute = ({ params, request }) => {
  console.log('[params]', params)
  console.log('[request]', request)
  // getSchema(contract)
  return {
    body: JSON.stringify({
      message: "This was a GET!"
    })
  }
};

// type NearInterface = ContractInterface & SchemaInterface & { stale?: true }

// /**
//  * Get `contract` from url params and use it to initialize near connection.
//  *
//  * If no `contract` in url params, returns blanks
//  */
// export default function useNear(): NearInterface | typeof stub {
//   const { nearContract: contract } = useParams()

//   useEffect(() => {
//     // if (!contract || (cache[contract] && !cache[contract].stale)) return

//     (async () => {
//       const freshSchema = await getSchema(contract)
//       if (!equal(freshSchema.schema, schema?.schema)) {
//         // setSchema({
//         //   ...cache,
//         //   [contract]: {
//         //     ...init(contract),
//         //     ...freshSchema,
//         //   }
//         // })
//         console.log('[[[freshSchema]]]', freshSchema)
//       }
//     })()
//   }, [contract])

//   if (!contract) return stub
//   return 
// }
