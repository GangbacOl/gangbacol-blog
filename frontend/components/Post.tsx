import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styled from "styled-components";

import { RootState } from "../interfaces/reducer/state.interface";
import { AsyncActionEnum } from "../interfaces/reducer/action.interface";

import Delete from "../public/assets/delete.svg";
interface Props {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
  isAdmin: boolean;
}

const Post = ({ id, title, description, updatedAt, isAdmin }: Props) => {
  const dispatch = useDispatch();
  const deletePostStatus = useSelector((state: RootState) => state.post.deletePostStatus);

  const parseDate = () => {
    const newDate = new Date(updatedAt);
    const year = newDate.getFullYear(),
      month = newDate.getMonth() + 1,
      day = newDate.getDate();
    return year + "년 " + month + "월 " + day + "일";
  };
  const handleDelete = async (id: number) => {
    if (!deletePostStatus.data) return;
    dispatch({
      type: AsyncActionEnum.DELETE_POST_REQUEST,
      payload: id,
    });
    if (deletePostStatus.data.success === 200) {
    }
  };

  return (
    <Container>
      <ContentWrap>
        <TitleWrap>
          <Link href={`/post/${id}`}>
            <Title>{title}</Title>
          </Link>
        </TitleWrap>
        <DescWrap>
          <Desc>{description}</Desc>
        </DescWrap>
        <DateWrap>
          <DateItem>{parseDate()}</DateItem>
        </DateWrap>
      </ContentWrap>
      {isAdmin && (
        <ButtonSvgWrap>
          <DeleteSvg onClick={() => handleDelete(id)} />
        </ButtonSvgWrap>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  border-radius: 20px;
  padding: 0 20px;
  background: #f8f8f8;
  box-shadow: 14px 14px 28px #bcbcbc, -14px -14px 28px #ffffff;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 19px 19px 38px #bcbcbc, -19px -19px 38px #ffffff;
  }
  @media only screen and (max-width: 1024px) {
    width: calc(100% - 34px);
    border-radius: 15px;
    padding: 0 17px;
  }
  @media only screen and (max-width: 450px) {
    position: relative;
    width: calc(100% - 20px);
    margin: 15px 0;
    border-radius: 10px;
    padding: 0 10px;
  }
`;
const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const TitleWrap = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
const Title = styled.h2`
  margin: 20px auto 10px auto;
`;
const DescWrap = styled.div``;
const Desc = styled.p`
  margin: 10px auto;
`;
const DateWrap = styled.div``;
const DateItem = styled.p`
  margin: 10px auto;
`;
const ButtonSvgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DeleteSvg = styled(Delete)`
  width: 25px;
  height: auto;
  margin: 0 10px;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.15);
  }
  @media only screen and (max-width: 1024px) {
    width: 20px;
    margin: 0 7px;
  }
  @media only screen and (max-width: 450px) {
    position: absolute;
    top: 12px;
    right: 2px;
    width: 17px;
  }
`;

export default memo(Post);
