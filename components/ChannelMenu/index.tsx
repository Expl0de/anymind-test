import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import type { NextPage } from 'next'
import { Button } from 'antd';
import styles from './styles/ChannelMenu.module.scss' 

const ChannelMenu: NextPage = () => {
  const { channel, channels, handleSetChannel } = useContext(AppContext)

  const channelButton = channels.map((val: string, index: number)=>(
    <Button 
      ghost
      className={
        val===channel?
        `${styles.channelButton} ${styles.active}`
        :styles.channelButton
      } 
      key={index}
      onClick={()=>handleSetChannel(val)}
    >
      {val}
    </Button>
  ))

  return (
    <div className={styles.container}>
      <div className={styles.channelListWrapper}>
        <span className={styles.channelLabelContainer}>2. Choose your Channel</span> 
        <span className={styles.channelListContainer}>
          {channelButton}
        </span>
      </div>
    </div>
  )
}

export default ChannelMenu
