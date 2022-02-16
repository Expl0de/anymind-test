import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import type { NextPage } from 'next'
import { Menu, Dropdown } from 'antd';
import Avatar from '../Avartar';
import { CaretDownOutlined } from '@ant-design/icons'
import styles from './styles/UserDropdown.module.scss' 

const UserDropdown: NextPage = () => {
  const { users, username, handleSetUsername } = useContext(AppContext)

  const UserDropdownWindowContainer: NextPage = () => {
    const UserDropdown = users.map((user: string, index: number)=>(
      <Menu.Item 
        key={index} 
        icon={<Avatar name={user} />}
        onClick={()=> handleSetUsername(user) }
      >
        {user}
      </Menu.Item>
    ))
    return(
      <Menu >
        {UserDropdown}
      </Menu>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.userLabelContainer}>1. Choose your user</div> 
      <Dropdown 
        overlay={<UserDropdownWindowContainer />} 
        placement="bottomLeft" 
        arrow
      >
          <div className={styles.userWrapper}>
            <Avatar name={username} />
            <span className={styles.dropdownTitleContainer}>
              {username}
            </span>
            <CaretDownOutlined className={styles.dropdownIconContainer} />
          </div>
      </Dropdown>
    </div>
  )
}

export default UserDropdown
