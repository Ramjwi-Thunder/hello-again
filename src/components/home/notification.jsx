import React, { useEffect, useState } from 'react';
import './notification.css';
import notificationIcon from '../../assets/images/notification.svg';

function Notification({ unreadCount = 1, onClick }) {
	const [hasUnread, setHasUnread] = useState(unreadCount > 0);

	useEffect(() => {
		setHasUnread(unreadCount > 0);
	}, [unreadCount]);

	const handleClick = () => {
		setHasUnread(false);
		onClick?.();
	};

	return (
		<button
			type="button"
			className="notification box"
			onClick={handleClick}
			aria-label="알림"
		>
			<img
				src={notificationIcon}
				alt=""
				aria-hidden="true"
				className="union"
			/>

			{hasUnread && (
				<span className="mingcute" aria-hidden="true">
					<span className="ellipse" />
				</span>
			)}
		</button>
	);
}

export default Notification;
