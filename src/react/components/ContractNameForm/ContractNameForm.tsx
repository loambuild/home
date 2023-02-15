import React, { useEffect, useMemo, useRef, useState } from "react"
import { init } from "../../../protocols/near"
import css from "./form.module.css";

export const ContractNameForm: React.FC<{
  autoFocus?: boolean
  contract?: string
  protocol: 'NEAR' | 'CosmWasm'
}> = ({
  autoFocus = false,
  contract,
  protocol,
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [custom, setCustomRaw] = useState<string>(contract ?? '')
    const [error, setError] = useState<string>()

    const setCustom = useMemo(() => (v: string) => {
      setError(undefined)
      setCustomRaw(v)
    }, [setCustomRaw, setError])

    useEffect(() => {
      if (autoFocus) inputRef.current?.focus()
    }, [autoFocus, inputRef])

    return (
      <form className="border-2 flex items-center rounded-md text-white pl-2 w-full" onSubmit={e => {
        e.preventDefault()

        if (!custom) return

        try {
          if (protocol === 'CosmWasm') {
            window.location.pathname = `/cw/${custom}`
          } else if (protocol === 'NEAR') {
            window.location.pathname = `/near/${init(custom).contract}`
          } else {
            throw new Error(`invalid protocol "${protocol}"!`)
          }
        } catch (e: unknown) {
          if (e instanceof Error) {
            setError(e.message)
          } else {
            setError(String(e))
          }
        }
      }}>
        <div className={css.border}>
          <label className={css.label} htmlFor="customContract">
            <svg
              viewBox="0 0 288 288"
              height="1.5em"
              width="1.5em"
              style={{ fill: "var(--fg)" }}
            >
              <desc>NEAR</desc>
              <path d="M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z" />
            </svg>
            <span className="sr-only">Contract Name</span>
          </label>
          <input
            className="flex-1 bg-transparent mx-3 focus:outline-none"
            id="customContract"
            value={custom}
            ref={inputRef}
            onChange={e => setCustom(e.target.value)}
          />
          <button className={css.button} disabled={!custom || custom === contract}>
            &rarr;
          </button>
        </div>
        {error && (
          <div className={`errorHint ${css.error}`}>{error}</div>
        )}
      </form>
    )
  }
