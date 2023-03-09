import { NearLogin, Logo, Methods } from '..'
import { Link } from "react-router-dom"
import css from './sidebar.module.css'
import useWindowDimensions from '../../hooks/useWindowDimensions'

export const Sidebar: React.FC<React.PropsWithChildren<{
  showLogin: 'near' | false,
}>> = ({ showLogin }) => {
  const { isMobile } = useWindowDimensions()
  return (
    <div className="mycelium flex flex-col h-screen w-fit px-10 min-w-[300px]">
      {!isMobile && (
        <div className={css.nav}>
          <div className="flex items-center justify-center py-5">
            <Link to="/" style={{ border: 'none', background: 'transparent' }}>
              <Logo className="p-3" />
            </Link>
          </div>
          {showLogin === 'near' && <NearLogin />}
        </div>
      )}
      <Methods />
      {isMobile && <div className={css.arrow} />}
    </div>
  )
}
