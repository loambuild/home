import React, { useEffect, useState } from "react"
import { ConnectedWalletAccount } from 'near-api-js'
import useNear from "../../hooks/useNear"
import { Dropdown } from ".."
import { Wallet } from './Wallet'
import css from './nearlogin.module.css'

export function NearLogin() {
  const { currentUser, signIn, signOut } = useNear()
  const [user, setUser] = useState<ConnectedWalletAccount>()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    currentUser.then(u => {
      setUser(u)
      setLoaded(true)
    })
  }, [currentUser])

  return (
    <div
      className="bg-black text-white flex items-center justify-center rounded-lg p-3 text-lg mb-4"
      style={{ visibility: loaded ? undefined : 'hidden' }}
    >
      {user ? (
        <Dropdown
          trigger={
            <button title={user.accountId}>
              <Wallet />
              <span className="ellipsis">
                {user.accountId}
              </span>
            </button>
          }
          items={[{ children: "Sign Out", onSelect: signOut }]}
        />
      ) : (
        <button onClick={signIn} className="flex items-center justify-center"><Wallet /><span className="ml-2">Sign In</span></button>
      )}
    </div>
  )
}
