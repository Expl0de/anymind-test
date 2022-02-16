import type { NextPage } from 'next'
import styles from './styles/SideMenu.module.scss' 
import UserDropdown from '../UserDropdown'
import ChannelMenu from '../ChannelMenu'

const SideMenu: NextPage = () => {
  return (
    <div className={styles.container}>
      <UserDropdown />
      <ChannelMenu />
    </div>
  )
}

export default SideMenu
