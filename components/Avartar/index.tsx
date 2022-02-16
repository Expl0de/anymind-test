import type { NextPage } from 'next'
import { Avatar } from 'antd';
import { getAvartarUrl } from '../../services/avartarService'
import styles from './styles/Avartar.module.scss' 

interface AvartarComponentProps {
  name: string
}
const AvartarComponent: NextPage<AvartarComponentProps> = (props) => {
  const {name} = props
  return (
    <Avatar className={styles.avartarImageContainer} src={getAvartarUrl(name)} />
  )
}

export default AvartarComponent
