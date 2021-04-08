/*
 * @Author: gary 
 * @Date: 2021-04-08 19:39:45 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 19:41:33
 */
import { useQuery } from "react-query";
import { http, IResponse } from "../../../utils/http";

/**
 * @description 获取消费券金额
 */
const useCouponPrice = () => {
  const { data } = useQuery('/v1/coupon-setting/couponPriceList', async () => {
    const response = await http.get<IResponse<number[]>>('/v1/coupon-setting/couponPriceList');

    return response.data.result;
  });

  return data;
}

export default useCouponPrice;