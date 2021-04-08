/*
 * @Author: gary 
 * @Date: 2021-04-08 19:40:16 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 19:40:45
 */
import { useMutation } from "react-query";
import usePassword from "../../../hook/use-password";
import { http } from "../../../utils/http";

/**
 * @description 删除消费券
 */
const useDeleteCoupon = () => {
  const openPassword = usePassword();
  const { mutateAsync } = useMutation('/v1/coupon-setting/delete', async (id: string) => {
    const password = await openPassword();
    await http.delete(`/v1/coupon-setting/delete/${id}?optPassword=${password}`);
  });

  return mutateAsync;
}

export default useDeleteCoupon;