import React, { useEffect, useState } from "react";
import snake from "to-snake-case";
import { Root as Tooltip, Portal, Trigger, Content, Arrow } from '@radix-ui/react-tooltip';
import useNear from '../../hooks/useNear'
import { getDefinition, canCall } from '../../../protocols/near'
import { getContractData } from '../../utils'
import type { ContractMethod } from '../../../protocols/types'
import css from './methods.module.css';
import { Crown } from './Crown'

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
          <div className={css.restrictedTo}>
            <span>Restricted to:</span>
            <Crown fill="var(--gray-6)" />
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
  protocol: 'near' | 'cw'
}> = ({ contract, isCurrentMethod, method, protocol }) => {
  const { currentUser } = useNear()
  const contractData = getContractData()
  const [allowed, setAllowed] = useState<boolean>(true)
  const [whyForbidden, setWhyForbidden] = useState<string>()

  useEffect(() => {
    if (!currentUser || !contractData) return
    (async () => {
      const user = await currentUser
      canCall(contractData, method.title, user?.accountId).then(can => {
        setAllowed(can[0])
        setWhyForbidden(can[1] || undefined)
      })
    })()
  }, [method, currentUser, canCall])

  if (isCurrentMethod) {
    return (
      <div
        className={allowed ? undefined : css.forbidden}
        title={allowed ? undefined : `Forbidden: ${whyForbidden}`}
      >
        {snake(method.title)}
        <Tip method={method} />
      </div>
    )
  }

  return (
    <a
      aria-controls="mainContent"
      href={`/${protocol}/${contract}/${method.link}`}
      className={`${allowed ? undefined : css.forbidden} no-underline py-1`}
      title={allowed ? undefined : `Forbidden: ${whyForbidden}`}
    >
      {snake(method.title)}
      <Tip method={method} />
    </a>
  )
}
