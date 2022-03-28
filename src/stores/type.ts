export interface ShowAddSwitch {
  noInfect: boolean;
  localConfirm: boolean;
  all: boolean;
  confirm: boolean;
  suspect: boolean;
  dead: boolean;
  nowConfirm: boolean;
  nowSevere: boolean;
  heal: boolean;
  importedCase: boolean;
  localinfeciton: boolean;
}

export interface Today {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  tip: string;
  wzz_add: number;
}

export interface Total {
  heal: number;
  showHeal: boolean;
  wzz: number;
  provinceLocalConfirm: number;
  nowConfirm: number;
  confirm: number;
  dead: number;
  showRate: boolean;
}

export interface Today {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
}

export interface Total {
  nowConfirm: number;
  confirm: number;
  dead: number;
  showRate: boolean;
  heal: number;
  showHeal: boolean;
  wzz: number;
  provinceLocalConfirm: number;
}

export interface Children {
  id: number;
  today: Today;
  total: Total;
  name: string;
}

export interface Children {
  id: number;
  name: string;
  today: Today;
  total: Total;
  children: Children[];
}

export interface Today {
  confirm: number;
  isUpdated: boolean;
}

export interface Total {
  wzz: number;
  provinceLocalConfirm: number;
  nowConfirm: number;
  confirm: number;
  dead: number;
  showRate: boolean;
  heal: number;
  showHeal: boolean;
}

export interface AreaTree {
  children: Children[];
  name: string;
  today: Today;
  total: Total;
}

export interface ChinaTotal {
  nowSevere: number;
  showLocalConfirm: number;
  showlocalinfeciton: number;
  confirm: number;
  localConfirm: number;
  noInfectH5: number;
  localConfirmH5: number;
  heal: number;
  dead: number;
  nowConfirm: number;
  importedCase: number;
  noInfect: number;
  suspect: number;
  local_acc_confirm: number;
}

export interface ChinaAdd {
  suspect: number;
  nowSevere: number;
  importedCase: number;
  noInfect: number;
  localConfirmH5: number;
  heal: number;
  dead: number;
  nowConfirm: number;
  confirm: number;
  localConfirm: number;
  noInfectH5: number;
}

export interface Diseaseh5Shelf {
  showAddSwitch: ShowAddSwitch;
  areaTree: AreaTree[];
  lastUpdateTime: string;
  chinaTotal: ChinaTotal;
  chinaAdd: ChinaAdd;
  isShowAdd: boolean;
}

export interface StatisGradeCityDetail {
  province: string;
  dead: number;
  heal: number;
  grade: string;
  date: string;
  sdate: string;
  syear: number;
  city: string;
  nowConfirm: number;
  confirmAdd: number;
  confirm: number;
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf;
  statisGradeCityDetail: StatisGradeCityDetail[];
}
