import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import logo from '../images/logo.png';
import '../css/Tos.css';

function Tos() {
  const navigate = useNavigate();
  /* 체크박스 전체선택 */
  const [allCheck, setAllCheck] = useState(false);
  const [isTerms, setIsTerms] = useState(false);
  const [isUse, setIsUse] = useState(false);

  //전체 선택 이벤트
  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setIsTerms(true);
      setIsUse(true);
    } else {
      setAllCheck(false);
      setIsTerms(false);
      setIsUse(false);
    }
  };

  // 선택 이벤트
  const termsBtnEvent = () => {
    if (isTerms === false) {
      setIsTerms(true);
    } else {
      setIsTerms(false);
    }
  };
  // 선택 이벤트
  const useBtnEvent = () => {
    if (isUse === false) {
      setIsUse(true);
    } else {
      setIsUse(false);
    }
  };

  const handleComplete = () => {
    navigate(`/signup`);
  };

  useEffect(() => {
    if (isTerms === true && isUse === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [isTerms, isUse]);

  const terms =
    '여러분을 환영합니다.  인포마켓 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다.  본 약관은 다양한 인포마켓 서비스의 이용과 관련하여 인포마켓 서비스를 제공하는 인포마켓 와 이를 이용하는 인포마켓 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 인포마켓 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.  인포마켓 서비스를 이용하시거나 인포마켓 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.';
  const terms2 =
    '개인정보보호법에 따라 인포마켓에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다. 1. 수집하는 개인정보이용자는 회원가입을 하지 않아도 정보 검색, 뉴스 보기 등 대부분의 인포마켓 서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 메일, 캘린더, 카페, 블로그 등과 같이 개인화 혹은 회원제 서비스를 이용하기 위해 회원가입을 할 경우, 인포마켓은 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.';

  return (
    // <div>
    //   <Header />
    <div>
      <img src={logo} alt="logo " className="login-logo" />
      <div className="termsContainer">
        <div>
          <div className="termBody-header">
            <div className="header-title">
              <h2>인포마켓 이용 약관</h2>
            </div>
            <h4>개인정보 수집 및 이용에 동의해주세요</h4>
            <div className="term-div">
              <label htmlFor="all-check">모두 동의합니다</label>
              <input
                type="checkbox"
                id="all-check"
                checked={allCheck}
                onChange={allBtnEvent}
              />
            </div>
          </div>
          <div>
            <div className="term-div1">
              <label htmlFor="use-check">인포마켓 이용약관 동의 (필수)</label>
              <input
                type="checkbox"
                id="use-check"
                checked={isUse}
                onChange={useBtnEvent}
              />
            </div>
            <div>
              <textarea readOnly="readOnly" defaultValue={terms} />
            </div>
            <div className="term-div2">
              <label htmlFor="terms-check">
                개인정보 수집 및 이용 동의(필수)
              </label>
              <input
                type="checkbox"
                id="terms-check"
                checked={isTerms}
                onChange={termsBtnEvent}
              />
            </div>
            <div>
              <textarea readOnly="readOnly" defaultValue={terms2} />
            </div>
          </div>
          <div className="sign-button">
            <button
              type="button"
              className="termsAgreeBtn"
              onClick={handleComplete}
            >
              확인
            </button>
            <button
              type="button"
              className="termsBackBtn"
              onClick={handleComplete}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
    //   <Footer />
    // </div>
  );
}

export default Tos;
