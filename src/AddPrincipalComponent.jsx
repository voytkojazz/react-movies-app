import AddPrincipalForm from "./AddPrincipalForm";
import { Button, notification, Space } from 'antd';

export default function AddPrincipalComponent () {

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, id) => {
      api[type]({
        message: 'The actor was added to Movie!',
        description:
          `The conection between person and movie was created! The record's id is ${id}.`,
      });
    };

    return (
        <>
            {contextHolder}
            <div className="add-card">
                <AddPrincipalForm notificationFunc={openNotificationWithIcon}/>
            </div>
        </>
    )
}