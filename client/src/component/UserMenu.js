import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, selectUserInfo } from '../store/slices/userInfo';
import axios from 'axios';

const EntireContainer = styled.li`
  position: relative;
  > ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  > ul.login-signup-btn {
    display: inline-flex;
    > li.login-btn {
      margin-right: 15px;
    }
  }
  > ul.popup {
    background-color: #fff;
    position: absolute;
    top: calc(100% + 25px);
    right: -10px;
    border: 1px solid #ebebeb;
    box-shadow: var(--box-shadow);
    border-radius: 5px 0 5px 5px;
    overflow: hidden;
    > li {
      padding: 15px 19px;
      font-family: var(--noto-sans);
      &:hover {
        background-color: #f4f4f4;
        cursor: pointer;
      }
    }
  }
`;

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin } = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((nextIsOpen) => !nextIsOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogOut = () => {
    // axios
    //   .get(
    //     'http://debugnote-client.s3-website.ap-northeast-2.amazonaws.com/auth/logout',
    //   )
    //   .then((res) => dispatch(logout()))
    //   .catch((err) => console.log(err));
    dispatch(clearState());
  };

  return (
    <EntireContainer className="userMenu">
      {isLogin ? (
        <FontAwesomeIcon
          icon={faCircleUser}
          className="iconButton"
          size="2x"
          onClick={handleButtonClick}
        />
      ) : (
        <ul className="login-signup-btn">
          <li className="login-btn">
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              로그인
            </Link>
          </li>
          <li className="signup-btn">
            <Link
              to="/signup"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              회원가입
            </Link>
          </li>
        </ul>
      )}

      {isOpen && (
        <ul className="popup">
          <li className="logout-btn" onClick={handleLogOut}>
            로그아웃
          </li>
          <li className="mypage-btn">
            <Link
              to="/mypage/info/change"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              마이페이지
            </Link>
          </li>
        </ul>
      )}
    </EntireContainer>
  );
}

export default UserMenu;
