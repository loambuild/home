import React, { useState } from "react";
import { getContractData } from "../../utils";
import { Root as Collapsible, Trigger, Content } from '@radix-ui/react-collapsible';
import { Method } from './Method'
import type { ContractMethodGroup } from '../../../protocols/types'
import css from './section.module.css';

/**
 * A collapsible Sidebar section. Normally, you need to pass both a `heading`
 * and `methods`, and all the methods will be nested under the `heading`. But!
 * You can also pass JUST a `heading`, and it will be rendered AS a method, for
 * methods that don't fit in any particular category.
 */
export const Section: React.FC<React.PropsWithChildren<ContractMethodGroup>> = ({ heading, methods }) => {
  const [open, setOpen] = useState(true)
  const { nearContract, cwContract, method: currentMethod } = getContractData()
  const contract = nearContract ?? cwContract

  if (!contract) return null

  return (
    <Collapsible
      open={open}
      className={`${css.section} ${!open && css.closed}`}
    >
      <label className="flex">
        <h3 className="uppercase text-gray-400 font-bold text-xl cursor-pointer">{heading}</h3>
        <Trigger asChild>
          <button
            className={css.chevron}
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">{open ? 'Collapse section' : 'Expand section'}</span>
          </button>
        </Trigger>
      </label>
      <Content className={`${css.content} pl-4 mt-2 mb-4 list-none text-lg font-medium text-gray-400 border-l-2 border-l-black flex flex-col`} forceMount>
        {methods.map((method, i) =>
          <Method
            key={i}
            contract={contract}
            isCurrentMethod={method.link === currentMethod}
            method={method}
            protocol={nearContract ? 'near' : 'cw'}
          />
        )}
      </Content>
    </Collapsible>
  )
};

