import './AvatarCircle.css';
import avatar from './avatar.svg';

function AvatarCircle() {
  return (
    <div className="avatar-circle" aria-hidden="true">
      <img src={avatar} alt="" />
    </div>
  );
}

export default AvatarCircle;