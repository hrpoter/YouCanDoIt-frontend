import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Page(props) {
    const navigate = useNavigate();
    // 페이지가 마운트 되었을 때
    useEffect(() => {
        axios.get('/api/member-api/is-login')
        .then(function (response) {
            if(response.data === "") {
                sessionStorage.clear();
                navigate("/login");
            }
        }).catch(
            (error) => console.log(error)
        );
    }, []);

    const Logout = () => {
        axios.get('/api/member-api/logout')
        .then(function (response) {
            sessionStorage.clear();
            navigate("/login");
        }).catch(
            (error) => console.log(error)
        );
    }

    return(
        <Wrapper>
            <Logo>유캔두잇</Logo>
            <MainContainer>
                <Outside>
                    <UserService>
                        {sessionStorage.getItem("loginName")}
                        <span onClick={Logout}>로그아웃</span>
                    </UserService>
                    <Inside>
                        {props.children}
                    </Inside>
                </Outside>
                <MenuList>
                    <Menu>챌린지</Menu>
                    <Menu>스케줄러</Menu>
                    <Menu>친구</Menu>
                </MenuList>
            </MainContainer>
        </Wrapper>
    );
}

export default Page;

// 기본 틀
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

// 상단 서비스명
const Logo = styled.div`
    height: 55px;
    width: 194px;
    position: relative;
    left: 1110px;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    line-height: 55px;
    background-color: #F8BA00;
    border-radius: 10px 10px 0 0;
    cursor: default;
`;

// 다이어리와 주메뉴 영역
const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
`; 

// 다이어리
const Outside = styled.div`
    width: 1363px;
    height: 603px;
    background-color: #EFEFEF;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// 실제 콘텐츠가 삽입되는 영역
export const Inside = styled.div`
    width: 1283px;
    height: 508px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`; 

// 주메뉴
const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`; 

// 각 메뉴 개체
const Menu = styled.div`
    width: 87px;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    background-color: var(--primary-color);
    border-radius: 0 10px 10px 0;
    margin: 10px 0;
`;

// 닉네임, 로그아웃, 리마인더가 표시되는 영역
const UserService = styled.div`
    position:absolute;
    width: 1283px;
    top: 11px;
    font-size: 16px;
    font-weight: bold;

    span {
        margin-left: 25px;
        font-size: 13px;
        font-weight: 400;
        cursor: pointer;
    }
`;