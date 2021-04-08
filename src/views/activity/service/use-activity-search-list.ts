/*
 * @Author: gary 
 * @Date: 2021-04-08 19:39:11 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 20:00:35
 */
import { useQuery } from "react-query";
import { http, IResponse } from "../../../utils/http";
import { IActivityForSearch } from "../activity-interface";

/**
 * @description 获取活动列表-搜索使用
 */
const useActivitySearchList = () => {
  const { data } = useQuery('/v1/activity/list', async () => {
    const response = await http.post<IResponse<IActivityForSearch[]>>('/v1/activity/list');

    return response.data.result;
  });

  return data;
}

export default useActivitySearchList;