/*
 * @Author: gary 
 * @Date: 2021-04-08 19:40:07 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 19:41:12
 */
import { useQuery } from "react-query";
import { http, IResponse } from "../../../utils/http";
import { ICouponType } from "../ticket-interface";

/**
 * @description 获取消费券类型
 */
const useCouponType = () => {
  const { data } = useQuery('/v1/coupon-type/list', async () => {
    const response = await http.post<IResponse<ICouponType[]>>('/v1/coupon-type/list');

    return response.data.result;
  });

  return data;
}

export default useCouponType;