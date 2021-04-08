export interface ITicket {
  activityId: string;
  activityName: string;
  activityStatus: 1 | 2 | 3 | 4;
  createId: string;
  createTime: string;
  curTime: number;
  endTime: string;
  id: string;
  limitPrice: number;
  name: string;
  price: number;
  receiveCount: number;
  remark: string;
  startTime: string;
  status: 1 | 2 | 3 | 4;
  totalCount: number;
  typeId: string;
  typeName: string;
  useCount: number;
}

export interface ICouponType {
  amount: number;
  id: string;
  name: string;
  ruleRemark: string;
}