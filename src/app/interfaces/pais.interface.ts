export interface PaisInterface {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc?: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currencies;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Languages;
  translations: Translations;
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  fifa?: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode?: PostalCode;
  borders?: string[];
  gini?: Gini;
}

interface Gini {
  '2019'?: number;
  '2014'?: number;
  '2006'?: number;
  '1999'?: number;
  '2018'?: number;
  '2017'?: number;
}

interface PostalCode {
  format: string;
  regex: string;
}

interface CapitalInfo {
  latlng: number[];
}

interface CoatOfArms {
  png?: string;
  svg?: string;
}

interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

interface Car {
  signs: string[];
  side: string;
}

interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

interface Demonyms {
  eng: Eng;
  fra?: Eng;
}

interface Eng {
  f: string;
  m: string;
}

interface Translations {
  ara: Spa;
  bre: Spa;
  ces: Spa;
  cym: Spa;
  deu: Spa;
  est: Spa;
  fin: Spa;
  fra: Spa;
  hrv: Spa;
  hun: Spa;
  ita: Spa;
  jpn: Spa;
  kor: Spa;
  nld: Spa;
  per: Spa;
  pol: Spa;
  por: Spa;
  rus: Spa;
  slk: Spa;
  spa: Spa;
  srp: Spa;
  swe: Spa;
  tur: Spa;
  urd: Spa;
  zho: Spa;
}

interface Languages {
  spa: string;
  ber?: string;
  mey?: string;
  eng?: string;
  fra?: string;
  por?: string;
  aym?: string;
  que?: string;
  bjz?: string;
  grn?: string;
  cha?: string;
  cat?: string;
  eus?: string;
  glc?: string;
}

interface Idd {
  root: string;
  suffixes: string[];
}

interface Currencies {
  CUC?: CUC;
  CUP?: CUC;
  CRC?: CUC;
  NIO?: CUC;
  DOP?: CUC;
  DZD?: CUC;
  MAD?: CUC;
  MRU?: CUC;
  USD?: CUC;
  XAF?: CUC;
  GTQ?: CUC;
  PEN?: CUC;
  COP?: CUC;
  VES?: CUC;
  BZD?: CUC;
  BOB?: CUC;
  EUR?: CUC;
  PYG?: CUC;
  UYU?: CUC;
  PAB?: CUC;
  MXN?: CUC;
  HNL?: CUC;
  CLP?: CUC;
  ARS?: CUC;
}

interface CUC {
  name: string;
  symbol: string;
}

interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

interface NativeName {
  spa: Spa;
  ber?: Spa;
  mey?: Spa;
  eng?: Spa;
  fra?: Spa;
  por?: Spa;
  aym?: Spa;
  que?: Spa;
  bjz?: Spa;
  grn?: Spa;
  cha?: Spa;
}

interface Spa {
  official: string;
  common: string;
}