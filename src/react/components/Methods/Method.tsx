import React, { useEffect, useState } from "react";
import snake from "to-snake-case";
import { Link } from "react-router-dom";
import { Root as Tooltip, Portal, Trigger, Content, Arrow } from '@radix-ui/react-tooltip';
import useNear from '../../hooks/useNear'
import { getDefinition, canCall } from '../../../protocols/near'
import { getContractData } from '../../utils'
import type { ContractMethod } from '../../../protocols/types'
import { Crown } from './Crown'
import type { Protocols } from "./utils";

const Tip: React.FC<{ method: ContractMethod }> = ({ method }) => {
  const { nearContract, schema } = getContractData();
  const [restrictedTo, setRestrictedTo] = useState<string>()

  useEffect(() => {
    setRestrictedTo(
      getDefinition(schema, method.title)?.allow
        ?.map(x => x.replace(/^::/, ''))
        ?.join(', ')
    )
  }, [getDefinition, method])

  if (!nearContract) return null
  if (!restrictedTo) return null

  return (
    <Tooltip>
      <Trigger asChild>
        <span className="flex">
          <span className="sr-only">Restricted</span>
          <Crown />
        </span>
      </Trigger>
      <Portal>
        <Content className="tooltip">
          <div className="text-neutral-500 flex gap-1">
            <span>Restricted to:</span>
            <Crown className="basis-4 shrink-0 fill-neutral-500" />
          </div>
          <div>
            {restrictedTo}
          </div>
          <Arrow />
        </Content>
      </Portal>
    </Tooltip>
  )
};

export const Method: React.FC<{
  contract?: string
  isCurrentMethod: boolean
  method: ContractMethod
  protocol: Protocols
}> = ({ contract, isCurrentMethod, method, protocol }) => {
  const { currentUser } = useNear()
  const contractData = getContractData()
  const [allowed, setAllowed] = useState<boolean>(true)
  const [whyForbidden, setWhyForbidden] = useState<string>()

  useEffect(() => {
    if (!currentUser || !contractData) return
    (async () => {
      const user = await currentUser
      if(!user) {
        setAllowed(false)
        return
      }
      canCall(contractData, method.title, user?.accountId).then(can => {
        setAllowed(can[0])
        setWhyForbidden(can[1] || undefined)
      })
    })()
  }, [method, currentUser, canCall])

  if (isCurrentMethod) {
    return (
      <div
        className="flex items-center border-0 leading-loose px-4 gap-1 text-white rounded-r-md bg-black font-bold"
        title={allowed ? undefined : `Forbidden: ${whyForbidden}`}
      >
        {snake(method.title)}
        <Tip method={method} />
      </div>
    )
  }

  return (
    <Link
      aria-controls="mainContent"
      to={`/${protocol}/${contract}/${method.link}`}
      className={`${allowed ? 'text-white' : 'text-neutral-400'} flex items-center border-0 leading-loose px-4 gap-1 text-white no-underline`}
      title={allowed ? undefined : `Forbidden: ${whyForbidden}`}
    >
      {snake(method.title)}
      <Tip method={method} />
    </Link>
  )
}
