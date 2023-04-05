import { useEffect, useState } from "react"
import type { ConnectedWalletAccount } from 'near-api-js'
import useNear from "../../hooks/useNear"
import { Dropdown } from ".."
import { Wallet } from './Wallet'

export function NearLogin() {
  const { currentUser, signIn, signOut } = useNear()
  const [user, setUser] = useState<ConnectedWalletAccount>()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    currentUser && currentUser.then(u => {
      setUser(u)
      setLoaded(true)
    })
  }, [currentUser])

  return (
    <div
      className="flex justify-around "
      style={{ visibility: loaded ? undefined : 'hidden' }}
    >
      {user ? (
        <Dropdown
          trigger={
            <button title={user.accountId} className="bg-black text-white flex items-center gap-3 px-4 py-2 text-lg rounded-lg">
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
