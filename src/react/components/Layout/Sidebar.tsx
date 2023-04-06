import { NearLogin, Logo, Methods } from '..'
import { Link } from "react-router-dom"
import css from './sidebar.module.css'
import useWindowDimensions from '../../hooks/useWindowDimensions'

export const Sidebar: React.FC<React.PropsWithChildren<{
  showLogin: 'near' | false,
}>> = ({ showLogin }) => {
  const { isMobile } = useWindowDimensions()
  return (
    <div className={
        `mycelium flex flex-col w-fit p-5 min-w-[300px] ${
          isMobile
            ? 'rounded-lg shadow-md'
            : 'h-screen overflow-y-scroll oveflow-x-hidden overscroll-none'
        }`
    }>
      {!isMobile && (
        <div className={css.nav}>
          <div className="flex items-center justify-center py-5">
            <Link to="/" style={{ border: 'none', background: 'transparent' }}>
              <Logo className="p-0" />
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
