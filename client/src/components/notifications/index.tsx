import React, { useCallback } from 'react'
import { useAccount } from 'wagmi'
import * as PushAPI from '@pushprotocol/restapi';


const Notificacions = () => {
  const {isConnected} = useAccount();
  const loadNotifications = useCallback(async () => {
    try {
      // const feeds = await PushAPI.user.getFeeds({
      //   user: 
      // });
    } catch (error) {
      
    }
  }, [isConnected])
  return (
    <div>index</div>
  )
}

export default Notificacions;