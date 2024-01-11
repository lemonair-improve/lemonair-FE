import React, { useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  const sendAmountToServer = async (amount) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.post('http://localhost:8081/api/point', {
        point : amount,
      }, 
      {
        headers: {
        Authorization: accessToken,
      }
    });

      if (response.status === 200) {
        alert('서버로 amount 전송 완료');
      } else {
        alert('서버로 amount 전송 실패');
      }
    } catch (error) {
      console.error('서버로 amount 전송 중 오류:', error);
      alert('서버로 amount 전송 중 오류 발생');
    }
  };

  const requestPay = () => {
    const { IMP } = window;
    IMP.init('imp82385247');

    IMP.request_pay({
      pg:
      pay_method: 'card',
      merchant_uid: new Date().getTime(),
      name: '테스트 상품',
      amount: 1004,
      buyer_email: 'test@naver.com',
      buyer_name: '코드쿡',
      buyer_tel: '010-1234-5678',
      buyer_addr: '서울특별시',
      buyer_postcode: '123-456',
    }, async (rsp) => {
      try {
        const { data } = await axios.post('http://localhost:8081/verifyIamport/' + rsp.imp_uid);
        if (rsp.paid_amount === data.response.amount) {
          alert('결제 성공');
          sendAmountToServer(rsp.paid_amount);
        } else {
          alert('결제 실패');
        }
      } catch (error) {
        console.error('결제 검증 중 오류:', error);
        alert('결제 실패');
      }
    });
  };

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  return (
    <div>
      <button onClick={requestPay}>결제하기</button>
    </div>
  );
};

export default Payment;
