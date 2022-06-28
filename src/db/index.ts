import { connect } from 'mongoose';
import { DBLink } from './dbconfig';
const connectMongo = async () => {
  await connect(DBLink)
      .then(() => {
          console.log('数据库连接成功')
      })
      .catch(err => {
          console.log('数据库连接失败', err)
      })
}

export default connectMongo;