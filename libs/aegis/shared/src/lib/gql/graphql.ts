/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any };
  /** The `Decimal` scalar type represents a decimal floating-point number. */
  Decimal: { input: any; output: any };
};

export type AddAddressToCustomerError = ApplicationError;

export type AddAddressToCustomerInput = {
  address: CreateAddressInput;
  customerId: Scalars['ID']['input'];
};

export type AddAddressToCustomerPayload = {
  __typename?: 'AddAddressToCustomerPayload';
  customer?: Maybe<Customer>;
  errors?: Maybe<Array<AddAddressToCustomerError>>;
};

export type AddAddressToSupplierError = ApplicationError;

export type AddAddressToSupplierInput = {
  address: CreateAddressInput;
  supplierId: Scalars['ID']['input'];
};

export type AddAddressToSupplierPayload = {
  __typename?: 'AddAddressToSupplierPayload';
  errors?: Maybe<Array<AddAddressToSupplierError>>;
  supplier?: Maybe<Supplier>;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Alpha3Code>;
  dateTimeRemoved?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  number?: Maybe<Scalars['String']['output']>;
  removed: Scalars['Boolean']['output'];
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  type: AddressType;
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type AddressSortInput = {
  city?: InputMaybe<SortEnumType>;
  countryCode?: InputMaybe<SortEnumType>;
  dateTimeRemoved?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  number?: InputMaybe<SortEnumType>;
  removed?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  street?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  zipCode?: InputMaybe<SortEnumType>;
};

export const AddressType = {
  Delivery: 'DELIVERY',
  Mailing: 'MAILING',
  Visiting: 'VISITING',
} as const;

export type AddressType = (typeof AddressType)[keyof typeof AddressType];
export const Alpha3Code = {
  Abw: 'ABW',
  Afg: 'AFG',
  Ago: 'AGO',
  Aia: 'AIA',
  Ala: 'ALA',
  Alb: 'ALB',
  And: 'AND',
  Are: 'ARE',
  Arg: 'ARG',
  Arm: 'ARM',
  Asm: 'ASM',
  Ata: 'ATA',
  Atf: 'ATF',
  Atg: 'ATG',
  Aus: 'AUS',
  Aut: 'AUT',
  Aze: 'AZE',
  Bdi: 'BDI',
  Bel: 'BEL',
  Ben: 'BEN',
  Bes: 'BES',
  Bfa: 'BFA',
  Bgd: 'BGD',
  Bgr: 'BGR',
  Bhr: 'BHR',
  Bhs: 'BHS',
  Bih: 'BIH',
  Blm: 'BLM',
  Blr: 'BLR',
  Blz: 'BLZ',
  Bmu: 'BMU',
  Bol: 'BOL',
  Bra: 'BRA',
  Brb: 'BRB',
  Brn: 'BRN',
  Btn: 'BTN',
  Bvt: 'BVT',
  Bwa: 'BWA',
  Caf: 'CAF',
  Can: 'CAN',
  Cck: 'CCK',
  Che: 'CHE',
  Chl: 'CHL',
  Chn: 'CHN',
  Civ: 'CIV',
  Cmr: 'CMR',
  Cod: 'COD',
  Cog: 'COG',
  Cok: 'COK',
  Col: 'COL',
  Com: 'COM',
  Cpv: 'CPV',
  Cri: 'CRI',
  Cub: 'CUB',
  Cuw: 'CUW',
  Cxr: 'CXR',
  Cym: 'CYM',
  Cyp: 'CYP',
  Cze: 'CZE',
  Deu: 'DEU',
  Dji: 'DJI',
  Dma: 'DMA',
  Dnk: 'DNK',
  Dom: 'DOM',
  Dza: 'DZA',
  Ecu: 'ECU',
  Egy: 'EGY',
  Eri: 'ERI',
  Esh: 'ESH',
  Esp: 'ESP',
  Est: 'EST',
  Eth: 'ETH',
  Fin: 'FIN',
  Fji: 'FJI',
  Flk: 'FLK',
  Fra: 'FRA',
  Fro: 'FRO',
  Fsm: 'FSM',
  Gab: 'GAB',
  Gbr: 'GBR',
  Geo: 'GEO',
  Ggy: 'GGY',
  Gha: 'GHA',
  Gib: 'GIB',
  Gin: 'GIN',
  Glp: 'GLP',
  Gmb: 'GMB',
  Gnb: 'GNB',
  Gnq: 'GNQ',
  Grc: 'GRC',
  Grd: 'GRD',
  Grl: 'GRL',
  Gtm: 'GTM',
  Guf: 'GUF',
  Gum: 'GUM',
  Guy: 'GUY',
  Hkg: 'HKG',
  Hmd: 'HMD',
  Hnd: 'HND',
  Hrv: 'HRV',
  Hti: 'HTI',
  Hun: 'HUN',
  Idn: 'IDN',
  Imn: 'IMN',
  Ind: 'IND',
  Iot: 'IOT',
  Irl: 'IRL',
  Irn: 'IRN',
  Irq: 'IRQ',
  Isl: 'ISL',
  Isr: 'ISR',
  Ita: 'ITA',
  Jam: 'JAM',
  Jey: 'JEY',
  Jor: 'JOR',
  Jpn: 'JPN',
  Kaz: 'KAZ',
  Ken: 'KEN',
  Kgz: 'KGZ',
  Khm: 'KHM',
  Kir: 'KIR',
  Kna: 'KNA',
  Kor: 'KOR',
  Kwt: 'KWT',
  Lao: 'LAO',
  Lbn: 'LBN',
  Lbr: 'LBR',
  Lby: 'LBY',
  Lca: 'LCA',
  Lie: 'LIE',
  Lka: 'LKA',
  Lso: 'LSO',
  Ltu: 'LTU',
  Lux: 'LUX',
  Lva: 'LVA',
  Mac: 'MAC',
  Maf: 'MAF',
  Mar: 'MAR',
  Mco: 'MCO',
  Mda: 'MDA',
  Mdg: 'MDG',
  Mdv: 'MDV',
  Mex: 'MEX',
  Mhl: 'MHL',
  Mkd: 'MKD',
  Mli: 'MLI',
  Mlt: 'MLT',
  Mmr: 'MMR',
  Mne: 'MNE',
  Mng: 'MNG',
  Mnp: 'MNP',
  Moz: 'MOZ',
  Mrt: 'MRT',
  Msr: 'MSR',
  Mtq: 'MTQ',
  Mus: 'MUS',
  Mwi: 'MWI',
  Mys: 'MYS',
  Myt: 'MYT',
  Nam: 'NAM',
  Ncl: 'NCL',
  Ner: 'NER',
  Nfk: 'NFK',
  Nga: 'NGA',
  Nic: 'NIC',
  Niu: 'NIU',
  Nld: 'NLD',
  Nor: 'NOR',
  Npl: 'NPL',
  Nru: 'NRU',
  Nzl: 'NZL',
  Omn: 'OMN',
  Pak: 'PAK',
  Pan: 'PAN',
  Pcn: 'PCN',
  Per: 'PER',
  Phl: 'PHL',
  Plw: 'PLW',
  Png: 'PNG',
  Pol: 'POL',
  Pri: 'PRI',
  Prk: 'PRK',
  Prt: 'PRT',
  Pry: 'PRY',
  Pse: 'PSE',
  Pyf: 'PYF',
  Qat: 'QAT',
  Reu: 'REU',
  Rou: 'ROU',
  Rus: 'RUS',
  Rwa: 'RWA',
  Sau: 'SAU',
  Sdn: 'SDN',
  Sen: 'SEN',
  Sgp: 'SGP',
  Sgs: 'SGS',
  Shn: 'SHN',
  Sjm: 'SJM',
  Slb: 'SLB',
  Sle: 'SLE',
  Slv: 'SLV',
  Smr: 'SMR',
  Som: 'SOM',
  Spm: 'SPM',
  Srb: 'SRB',
  Ssd: 'SSD',
  Stp: 'STP',
  Sur: 'SUR',
  Svk: 'SVK',
  Svn: 'SVN',
  Swe: 'SWE',
  Swz: 'SWZ',
  Sxm: 'SXM',
  Syc: 'SYC',
  Syr: 'SYR',
  Tca: 'TCA',
  Tcd: 'TCD',
  Tgo: 'TGO',
  Tha: 'THA',
  Tjk: 'TJK',
  Tkl: 'TKL',
  Tkm: 'TKM',
  Tls: 'TLS',
  Ton: 'TON',
  Tto: 'TTO',
  Tun: 'TUN',
  Tur: 'TUR',
  Tuv: 'TUV',
  Twn: 'TWN',
  Tza: 'TZA',
  Uga: 'UGA',
  Ukr: 'UKR',
  Umi: 'UMI',
  Ury: 'URY',
  Usa: 'USA',
  Uzb: 'UZB',
  Vat: 'VAT',
  Vct: 'VCT',
  Ven: 'VEN',
  Vgb: 'VGB',
  Vir: 'VIR',
  Vnm: 'VNM',
  Vut: 'VUT',
  Wlf: 'WLF',
  Wsm: 'WSM',
  Xkx: 'XKX',
  Yem: 'YEM',
  Zaf: 'ZAF',
  Zmb: 'ZMB',
  Zwe: 'ZWE',
} as const;

export type Alpha3Code = (typeof Alpha3Code)[keyof typeof Alpha3Code];
export type ApplicationError = Error & {
  __typename?: 'ApplicationError';
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
  fieldName?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  type: ErrorType;
};

export type Article = Node & {
  __typename?: 'Article';
  code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discontinued: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  sellingUnit: Scalars['Decimal']['output'];
  suppliers?: Maybe<SuppliersConnection>;
};

export type ArticleSuppliersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SupplierSortInput>>;
  where?: InputMaybe<SupplierFilterInput>;
};

export type ArticleDiscontinuedPayload = {
  __typename?: 'ArticleDiscontinuedPayload';
  id: Scalars['ID']['output'];
};

export type ArticleFilterInput = {
  and?: InputMaybe<Array<ArticleFilterInput>>;
  code?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  discontinued?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<IdOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ArticleFilterInput>>;
  price?: InputMaybe<DecimalOperationFilterInput>;
  sellingUnit?: InputMaybe<DecimalOperationFilterInput>;
};

export type ArticleSortInput = {
  code?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  discontinued?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  price?: InputMaybe<SortEnumType>;
  sellingUnit?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type ArticlesConnection = {
  __typename?: 'ArticlesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ArticlesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Article>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ArticlesEdge = {
  __typename?: 'ArticlesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Article;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Country = {
  __typename?: 'Country';
  code: Alpha3Code;
  name: Scalars['String']['output'];
};

export type CreateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Alpha3Code>;
  number?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  type: AddressType;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type Customer = Node & {
  __typename?: 'Customer';
  active: Scalars['Boolean']['output'];
  addresses: Array<Address>;
  bic?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  dateTimeDeactivated?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  iban?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type CustomerAddressesArgs = {
  order?: InputMaybe<Array<AddressSortInput>>;
};

export type CustomerDeactivatedPayload = {
  __typename?: 'CustomerDeactivatedPayload';
  id: Scalars['ID']['output'];
};

export type CustomerFilterInput = {
  active?: InputMaybe<BooleanOperationFilterInput>;
  and?: InputMaybe<Array<CustomerFilterInput>>;
  bic?: InputMaybe<StringOperationFilterInput>;
  code?: InputMaybe<StringOperationFilterInput>;
  dateTimeDeactivated?: InputMaybe<DateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  iban?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IdOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CustomerFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  website?: InputMaybe<StringOperationFilterInput>;
};

export type CustomerSortInput = {
  active?: InputMaybe<SortEnumType>;
  bic?: InputMaybe<SortEnumType>;
  code?: InputMaybe<SortEnumType>;
  dateTimeDeactivated?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  iban?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  website?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type CustomersConnection = {
  __typename?: 'CustomersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CustomersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Customer>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CustomersEdge = {
  __typename?: 'CustomersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Customer;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DeactivateCustomerError = ApplicationError;

export type DeactivateCustomerInput = {
  id: Scalars['ID']['input'];
};

export type DeactivateCustomerPayload = {
  __typename?: 'DeactivateCustomerPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
  errors?: Maybe<Array<DeactivateCustomerError>>;
};

export type DeactivateSupplierError = ApplicationError;

export type DeactivateSupplierInput = {
  id: Scalars['ID']['input'];
};

export type DeactivateSupplierPayload = {
  __typename?: 'DeactivateSupplierPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
  errors?: Maybe<Array<DeactivateSupplierError>>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

export type DiscontinueArticleError = ApplicationError;

export type DiscontinueArticleInput = {
  id: Scalars['ID']['input'];
};

export type DiscontinueArticlePayload = {
  __typename?: 'DiscontinueArticlePayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
  errors?: Maybe<Array<DiscontinueArticleError>>;
};

export type Error = {
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
  fieldName?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  type: ErrorType;
};

export const ErrorType = {
  Conflict: 'CONFLICT',
  Failure: 'FAILURE',
  NotFound: 'NOT_FOUND',
  Problem: 'PROBLEM',
  Validation: 'VALIDATION',
} as const;

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];
export type IdInputOfGuidInput = {
  id: Scalars['ID']['input'];
};

export type IdOperationFilterInput = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  neq?: InputMaybe<Scalars['ID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type LinkToSupplierError = ApplicationError;

export type LinkToSupplierInput = {
  articleId: Scalars['ID']['input'];
  supplierId: Scalars['ID']['input'];
};

export type LinkToSupplierPayload = {
  __typename?: 'LinkToSupplierPayload';
  article?: Maybe<Article>;
  errors?: Maybe<Array<LinkToSupplierError>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAddressToCustomer: AddAddressToCustomerPayload;
  addAddressToSupplier: AddAddressToSupplierPayload;
  deactivateCustomer: DeactivateCustomerPayload;
  deactivateSupplier: DeactivateSupplierPayload;
  discontinueArticle: DiscontinueArticlePayload;
  linkToSupplier: LinkToSupplierPayload;
  registerArticle: RegisterArticlePayload;
  registerCustomer: RegisterCustomerPayload;
  registerSupplier: RegisterSupplierPayload;
  removeAddressFromCustomer: RemoveAddressFromCustomerPayload;
  removeAddressFromSupplier: RemoveAddressFromSupplierPayload;
  unlinkFromSupplier: UnlinkFromSupplierPayload;
  updateArticleDetails: UpdateArticleDetailsPayload;
  updateCustomerAddress: UpdateCustomerAddressPayload;
  updateCustomerDetails: UpdateCustomerDetailsPayload;
  updateSupplierAddress: UpdateSupplierAddressPayload;
  updateSupplierDetails: UpdateSupplierDetailsPayload;
};

export type MutationAddAddressToCustomerArgs = {
  input: AddAddressToCustomerInput;
};

export type MutationAddAddressToSupplierArgs = {
  input: AddAddressToSupplierInput;
};

export type MutationDeactivateCustomerArgs = {
  input: DeactivateCustomerInput;
};

export type MutationDeactivateSupplierArgs = {
  input: DeactivateSupplierInput;
};

export type MutationDiscontinueArticleArgs = {
  input: DiscontinueArticleInput;
};

export type MutationLinkToSupplierArgs = {
  input: LinkToSupplierInput;
};

export type MutationRegisterArticleArgs = {
  input: RegisterArticleInput;
};

export type MutationRegisterCustomerArgs = {
  input: RegisterCustomerInput;
};

export type MutationRegisterSupplierArgs = {
  input: RegisterSupplierInput;
};

export type MutationRemoveAddressFromCustomerArgs = {
  input: RemoveAddressFromCustomerInput;
};

export type MutationRemoveAddressFromSupplierArgs = {
  input: RemoveAddressFromSupplierInput;
};

export type MutationUnlinkFromSupplierArgs = {
  input: UnlinkFromSupplierInput;
};

export type MutationUpdateArticleDetailsArgs = {
  input: UpdateArticleDetailsInput;
};

export type MutationUpdateCustomerAddressArgs = {
  input: UpdateCustomerAddressInput;
};

export type MutationUpdateCustomerDetailsArgs = {
  input: UpdateCustomerDetailsInput;
};

export type MutationUpdateSupplierAddressArgs = {
  input: UpdateSupplierAddressInput;
};

export type MutationUpdateSupplierDetailsArgs = {
  input: UpdateSupplierDetailsInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  articleById?: Maybe<Article>;
  articles?: Maybe<ArticlesConnection>;
  countries: Array<Country>;
  customerById?: Maybe<Customer>;
  customers?: Maybe<CustomersConnection>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  supplierById?: Maybe<Supplier>;
  suppliers?: Maybe<SuppliersConnection>;
};

export type QueryArticleByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryArticlesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ArticleSortInput>>;
  where?: InputMaybe<ArticleFilterInput>;
};

export type QueryCustomerByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryCustomersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CustomerSortInput>>;
  where?: InputMaybe<CustomerFilterInput>;
};

export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySupplierByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySuppliersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SupplierSortInput>>;
  where?: InputMaybe<SupplierFilterInput>;
};

export type RegisterArticleError = ApplicationError;

export type RegisterArticleInput = {
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  sellingUnit: Scalars['Decimal']['input'];
  suppliers?: InputMaybe<Array<IdInputOfGuidInput>>;
};

export type RegisterArticlePayload = {
  __typename?: 'RegisterArticlePayload';
  article?: Maybe<Article>;
  errors?: Maybe<Array<RegisterArticleError>>;
};

export type RegisterCustomerError = ApplicationError;

export type RegisterCustomerInput = {
  addresses?: InputMaybe<Array<CreateAddressInput>>;
  bic?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterCustomerPayload = {
  __typename?: 'RegisterCustomerPayload';
  customer?: Maybe<Customer>;
  errors?: Maybe<Array<RegisterCustomerError>>;
};

export type RegisterSupplierError = ApplicationError;

export type RegisterSupplierInput = {
  addresses?: InputMaybe<Array<CreateAddressInput>>;
  bic?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterSupplierPayload = {
  __typename?: 'RegisterSupplierPayload';
  errors?: Maybe<Array<RegisterSupplierError>>;
  supplier?: Maybe<Supplier>;
};

export type RemoveAddressFromCustomerError = ApplicationError;

export type RemoveAddressFromCustomerInput = {
  addressId: Scalars['ID']['input'];
  customerId: Scalars['ID']['input'];
};

export type RemoveAddressFromCustomerPayload = {
  __typename?: 'RemoveAddressFromCustomerPayload';
  customer?: Maybe<Customer>;
  errors?: Maybe<Array<RemoveAddressFromCustomerError>>;
};

export type RemoveAddressFromSupplierError = ApplicationError;

export type RemoveAddressFromSupplierInput = {
  addressId: Scalars['ID']['input'];
  supplierId: Scalars['ID']['input'];
};

export type RemoveAddressFromSupplierPayload = {
  __typename?: 'RemoveAddressFromSupplierPayload';
  errors?: Maybe<Array<RemoveAddressFromSupplierError>>;
  supplier?: Maybe<Supplier>;
};

export const SortEnumType = {
  Asc: 'ASC',
  Desc: 'DESC',
} as const;

export type SortEnumType = (typeof SortEnumType)[keyof typeof SortEnumType];
export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onAddressAddedToCustomer: Customer;
  onAddressAddedToSupplier: Supplier;
  onAddressRemovedFromCustomer: Customer;
  onAddressRemovedFromSupplier: Supplier;
  onArticleDetailsUpdated: Article;
  onArticleDiscontinued: ArticleDiscontinuedPayload;
  onArticleRegistered: Article;
  onCustomerDeactivated: CustomerDeactivatedPayload;
  onCustomerDetailsUpdated: Customer;
  onCustomerRegistered: Customer;
  onSupplierDeactivated: SupplierDeactivatedPayload;
  onSupplierDetailsUpdated: Supplier;
  onSupplierLinkedToArticle: Article;
  onSupplierRegistered: Supplier;
  onSupplierUnlinkedFromArticle: Article;
};

export type Supplier = Node & {
  __typename?: 'Supplier';
  active: Scalars['Boolean']['output'];
  addresses: Array<Address>;
  bic?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  dateTimeDeactivated?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  iban?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type SupplierAddressesArgs = {
  order?: InputMaybe<Array<AddressSortInput>>;
};

export type SupplierDeactivatedPayload = {
  __typename?: 'SupplierDeactivatedPayload';
  id: Scalars['ID']['output'];
};

export type SupplierFilterInput = {
  active?: InputMaybe<BooleanOperationFilterInput>;
  and?: InputMaybe<Array<SupplierFilterInput>>;
  bic?: InputMaybe<StringOperationFilterInput>;
  code?: InputMaybe<StringOperationFilterInput>;
  dateTimeDeactivated?: InputMaybe<DateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  iban?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IdOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SupplierFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  website?: InputMaybe<StringOperationFilterInput>;
};

export type SupplierSortInput = {
  active?: InputMaybe<SortEnumType>;
  bic?: InputMaybe<SortEnumType>;
  code?: InputMaybe<SortEnumType>;
  dateTimeDeactivated?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  iban?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  website?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type SuppliersConnection = {
  __typename?: 'SuppliersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SuppliersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Supplier>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SuppliersEdge = {
  __typename?: 'SuppliersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Supplier;
};

export type UnlinkFromSupplierError = ApplicationError;

export type UnlinkFromSupplierInput = {
  articleId: Scalars['ID']['input'];
  supplierId: Scalars['ID']['input'];
};

export type UnlinkFromSupplierPayload = {
  __typename?: 'UnlinkFromSupplierPayload';
  article?: Maybe<Article>;
  errors?: Maybe<Array<UnlinkFromSupplierError>>;
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Alpha3Code>;
  id: Scalars['ID']['input'];
  number?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateArticleDetailsError = ApplicationError;

export type UpdateArticleDetailsInput = {
  addedSuppliers?: InputMaybe<Array<IdInputOfGuidInput>>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price?: Scalars['Float']['input'];
  removedSuppliers?: InputMaybe<Array<IdInputOfGuidInput>>;
  sellingUnit?: Scalars['Float']['input'];
};

export type UpdateArticleDetailsPayload = {
  __typename?: 'UpdateArticleDetailsPayload';
  article?: Maybe<Article>;
  errors?: Maybe<Array<UpdateArticleDetailsError>>;
};

export type UpdateCustomerAddressError = ApplicationError;

export type UpdateCustomerAddressInput = {
  address: UpdateAddressInput;
  customerId: Scalars['ID']['input'];
};

export type UpdateCustomerAddressPayload = {
  __typename?: 'UpdateCustomerAddressPayload';
  customer?: Maybe<Customer>;
  errors?: Maybe<Array<UpdateCustomerAddressError>>;
};

export type UpdateCustomerDetailsError = ApplicationError;

export type UpdateCustomerDetailsInput = {
  addedAddresses?: InputMaybe<Array<CreateAddressInput>>;
  bic?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  removedAddresses?: InputMaybe<Array<IdInputOfGuidInput>>;
  updatedAddresses?: InputMaybe<Array<UpdateAddressInput>>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerDetailsPayload = {
  __typename?: 'UpdateCustomerDetailsPayload';
  customer?: Maybe<Customer>;
  errors?: Maybe<Array<UpdateCustomerDetailsError>>;
};

export type UpdateSupplierAddressError = ApplicationError;

export type UpdateSupplierAddressInput = {
  address: UpdateAddressInput;
  supplierId: Scalars['ID']['input'];
};

export type UpdateSupplierAddressPayload = {
  __typename?: 'UpdateSupplierAddressPayload';
  errors?: Maybe<Array<UpdateSupplierAddressError>>;
  supplier?: Maybe<Supplier>;
};

export type UpdateSupplierDetailsError = ApplicationError;

export type UpdateSupplierDetailsInput = {
  addedAddresses?: InputMaybe<Array<CreateAddressInput>>;
  bic?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  removedAddresses?: InputMaybe<Array<IdInputOfGuidInput>>;
  updatedAddresses?: InputMaybe<Array<UpdateAddressInput>>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSupplierDetailsPayload = {
  __typename?: 'UpdateSupplierDetailsPayload';
  errors?: Maybe<Array<UpdateSupplierDetailsError>>;
  supplier?: Maybe<Supplier>;
};

export type ArticleFieldsFragment = {
  __typename?: 'Article';
  id: string;
  code: string;
  name: string;
  description?: string | null;
  price: any;
  sellingUnit: any;
} & { ' $fragmentName'?: 'ArticleFieldsFragment' };

export type ArticleDetailsFieldsFragment = {
  __typename?: 'Article';
  id: string;
  code: string;
  name: string;
  description?: string | null;
  price: any;
  sellingUnit: any;
  suppliers?: {
    __typename?: 'SuppliersConnection';
    nodes?: Array<{ __typename?: 'Supplier'; id: string; code: string; name: string }> | null;
  } | null;
} & { ' $fragmentName'?: 'ArticleDetailsFieldsFragment' };

export type RegisterArticleMutationVariables = Exact<{
  input: RegisterArticleInput;
}>;

export type RegisterArticleMutation = {
  __typename?: 'Mutation';
  registerArticle: {
    __typename?: 'RegisterArticlePayload';
    article?:
      | ({ __typename?: 'Article' } & {
          ' $fragmentRefs'?: { ArticleFieldsFragment: ArticleFieldsFragment };
        })
      | null;
    errors?: Array<{
      __typename?: 'ApplicationError';
      code: string;
      description: string;
      type: ErrorType;
      fieldName?: string | null;
      message: string;
    }> | null;
  };
};

export type UpdateArticleDetailsMutationVariables = Exact<{
  input: UpdateArticleDetailsInput;
}>;

export type UpdateArticleDetailsMutation = {
  __typename?: 'Mutation';
  updateArticleDetails: {
    __typename?: 'UpdateArticleDetailsPayload';
    article?:
      | ({ __typename?: 'Article' } & {
          ' $fragmentRefs'?: { ArticleFieldsFragment: ArticleFieldsFragment };
        })
      | null;
    errors?: Array<{
      __typename?: 'ApplicationError';
      code: string;
      description: string;
      type: ErrorType;
      fieldName?: string | null;
      message: string;
    }> | null;
  };
};

export type DiscontinueArticleMutationVariables = Exact<{
  input: DiscontinueArticleInput;
}>;

export type DiscontinueArticleMutation = {
  __typename?: 'Mutation';
  discontinueArticle: {
    __typename?: 'DiscontinueArticlePayload';
    boolean?: boolean | null;
    errors?: Array<{
      __typename?: 'ApplicationError';
      code: string;
      description: string;
      type: ErrorType;
      fieldName?: string | null;
      message: string;
    }> | null;
  };
};

export type LinkToSupplierMutationVariables = Exact<{
  input: LinkToSupplierInput;
}>;

export type LinkToSupplierMutation = {
  __typename?: 'Mutation';
  linkToSupplier: {
    __typename?: 'LinkToSupplierPayload';
    article?:
      | ({
          __typename?: 'Article';
          suppliers?: {
            __typename?: 'SuppliersConnection';
            nodes?: Array<{
              __typename?: 'Supplier';
              id: string;
              code: string;
              name: string;
            }> | null;
          } | null;
        } & { ' $fragmentRefs'?: { ArticleFieldsFragment: ArticleFieldsFragment } })
      | null;
    errors?: Array<{
      __typename?: 'ApplicationError';
      code: string;
      description: string;
      type: ErrorType;
      fieldName?: string | null;
      message: string;
    }> | null;
  };
};

export type UnlinkFromSupplierMutationVariables = Exact<{
  input: UnlinkFromSupplierInput;
}>;

export type UnlinkFromSupplierMutation = {
  __typename?: 'Mutation';
  unlinkFromSupplier: {
    __typename?: 'UnlinkFromSupplierPayload';
    article?:
      | ({
          __typename?: 'Article';
          suppliers?: {
            __typename?: 'SuppliersConnection';
            nodes?: Array<{
              __typename?: 'Supplier';
              id: string;
              code: string;
              name: string;
            }> | null;
          } | null;
        } & { ' $fragmentRefs'?: { ArticleFieldsFragment: ArticleFieldsFragment } })
      | null;
    errors?: Array<{
      __typename?: 'ApplicationError';
      code: string;
      description: string;
      type: ErrorType;
      fieldName?: string | null;
      message: string;
    }> | null;
  };
};

export type ArticlesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ArticleFilterInput>;
  order?: InputMaybe<Array<ArticleSortInput> | ArticleSortInput>;
}>;

export type ArticlesQuery = {
  __typename?: 'Query';
  articles?: {
    __typename?: 'ArticlesConnection';
    totalCount: number;
    nodes?: Array<
      { __typename?: 'Article' } & {
        ' $fragmentRefs'?: { ArticleFieldsFragment: ArticleFieldsFragment };
      }
    > | null;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  } | null;
};

export type ArticleDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type ArticleDetailsQuery = {
  __typename?: 'Query';
  articleById?:
    | ({
        __typename?: 'Article';
        suppliers?: {
          __typename?: 'SuppliersConnection';
          nodes?: Array<{ __typename?: 'Supplier'; id: string; code: string; name: string }> | null;
        } | null;
      } & { ' $fragmentRefs'?: { ArticleFieldsFragment: ArticleFieldsFragment } })
    | null;
};

export type OnArticleRegisteredSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnArticleRegisteredSubscription = {
  __typename?: 'Subscription';
  onArticleRegistered: { __typename?: 'Article' } & {
    ' $fragmentRefs'?: { ArticleFieldsFragment: ArticleFieldsFragment };
  };
};

export type OnArticleDetailsUpdatedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnArticleDetailsUpdatedSubscription = {
  __typename?: 'Subscription';
  onArticleDetailsUpdated: { __typename?: 'Article' } & {
    ' $fragmentRefs'?: { ArticleFieldsFragment: ArticleFieldsFragment };
  };
};

export type OnArticleDiscontinuedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnArticleDiscontinuedSubscription = {
  __typename?: 'Subscription';
  onArticleDiscontinued: { __typename?: 'ArticleDiscontinuedPayload'; id: string };
};

export type CustomerFieldsFragment = {
  __typename?: 'Customer';
  id: string;
  code: string;
  name: string;
  website?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  iban?: string | null;
  bic?: string | null;
} & { ' $fragmentName'?: 'CustomerFieldsFragment' };

export type CustomerAddressFieldsFragment = {
  __typename?: 'Address';
  id: string;
  type: AddressType;
  street?: string | null;
  number?: string | null;
  zipCode?: string | null;
  city?: string | null;
  state?: string | null;
  countryCode?: Alpha3Code | null;
} & { ' $fragmentName'?: 'CustomerAddressFieldsFragment' };

export type RegisterCustomerMutationVariables = Exact<{
  input: RegisterCustomerInput;
}>;

export type RegisterCustomerMutation = {
  __typename?: 'Mutation';
  registerCustomer: {
    __typename?: 'RegisterCustomerPayload';
    customer?:
      | ({ __typename?: 'Customer' } & {
          ' $fragmentRefs'?: { CustomerFieldsFragment: CustomerFieldsFragment };
        })
      | null;
    errors?: Array<{
      __typename?: 'ApplicationError';
      code: string;
      description: string;
      type: ErrorType;
      fieldName?: string | null;
      message: string;
    }> | null;
  };
};

export type UpdateCustomerDetailsMutationVariables = Exact<{
  input: UpdateCustomerDetailsInput;
}>;

export type UpdateCustomerDetailsMutation = {
  __typename?: 'Mutation';
  updateCustomerDetails: {
    __typename?: 'UpdateCustomerDetailsPayload';
    customer?:
      | ({ __typename?: 'Customer' } & {
          ' $fragmentRefs'?: { CustomerFieldsFragment: CustomerFieldsFragment };
        })
      | null;
    errors?: Array<{
      __typename?: 'ApplicationError';
      code: string;
      description: string;
      type: ErrorType;
      fieldName?: string | null;
      message: string;
    }> | null;
  };
};

export type DeactivateCustomerMutationVariables = Exact<{
  input: DeactivateCustomerInput;
}>;

export type DeactivateCustomerMutation = {
  __typename?: 'Mutation';
  deactivateCustomer: {
    __typename?: 'DeactivateCustomerPayload';
    boolean?: boolean | null;
    errors?: Array<{
      __typename?: 'ApplicationError';
      code: string;
      description: string;
      type: ErrorType;
      fieldName?: string | null;
      message: string;
    }> | null;
  };
};

export type CustomersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<CustomerFilterInput>;
  order?: InputMaybe<Array<CustomerSortInput> | CustomerSortInput>;
}>;

export type CustomersQuery = {
  __typename?: 'Query';
  customers?: {
    __typename?: 'CustomersConnection';
    totalCount: number;
    nodes?: Array<
      { __typename?: 'Customer' } & {
        ' $fragmentRefs'?: { CustomerFieldsFragment: CustomerFieldsFragment };
      }
    > | null;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  } | null;
};

export type CustomerDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type CustomerDetailsQuery = {
  __typename?: 'Query';
  customerById?:
    | ({
        __typename?: 'Customer';
        addresses: Array<
          { __typename?: 'Address' } & {
            ' $fragmentRefs'?: { CustomerAddressFieldsFragment: CustomerAddressFieldsFragment };
          }
        >;
      } & { ' $fragmentRefs'?: { CustomerFieldsFragment: CustomerFieldsFragment } })
    | null;
};

export type OnCustomerRegisteredSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnCustomerRegisteredSubscription = {
  __typename?: 'Subscription';
  onCustomerRegistered: { __typename?: 'Customer' } & {
    ' $fragmentRefs'?: { CustomerFieldsFragment: CustomerFieldsFragment };
  };
};

export type OnCustomerDetailsUpdatedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnCustomerDetailsUpdatedSubscription = {
  __typename?: 'Subscription';
  onCustomerDetailsUpdated: { __typename?: 'Customer' } & {
    ' $fragmentRefs'?: { CustomerFieldsFragment: CustomerFieldsFragment };
  };
};

export type OnCustomerDeactivatedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnCustomerDeactivatedSubscription = {
  __typename?: 'Subscription';
  onCustomerDeactivated: { __typename?: 'CustomerDeactivatedPayload'; id: string };
};

export type SupplierFieldsFragment = {
  __typename?: 'Supplier';
  id: string;
  code: string;
  name: string;
  website?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  iban?: string | null;
  bic?: string | null;
} & { ' $fragmentName'?: 'SupplierFieldsFragment' };

export type SupplierAddressFieldsFragment = {
  __typename?: 'Address';
  id: string;
  type: AddressType;
  street?: string | null;
  number?: string | null;
  zipCode?: string | null;
  city?: string | null;
  state?: string | null;
  countryCode?: Alpha3Code | null;
} & { ' $fragmentName'?: 'SupplierAddressFieldsFragment' };

export type RegisterSupplierMutationVariables = Exact<{
  input: RegisterSupplierInput;
}>;

export type RegisterSupplierMutation = {
  __typename?: 'Mutation';
  registerSupplier: {
    __typename?: 'RegisterSupplierPayload';
    supplier?:
      | ({ __typename?: 'Supplier' } & {
          ' $fragmentRefs'?: { SupplierFieldsFragment: SupplierFieldsFragment };
        })
      | null;
    errors?: Array<{
      __typename?: 'ApplicationError';
      code: string;
      description: string;
      type: ErrorType;
      fieldName?: string | null;
      message: string;
    }> | null;
  };
};

export type UpdateSupplierDetailsMutationVariables = Exact<{
  input: UpdateSupplierDetailsInput;
}>;

export type UpdateSupplierDetailsMutation = {
  __typename?: 'Mutation';
  updateSupplierDetails: {
    __typename?: 'UpdateSupplierDetailsPayload';
    supplier?:
      | ({ __typename?: 'Supplier' } & {
          ' $fragmentRefs'?: { SupplierFieldsFragment: SupplierFieldsFragment };
        })
      | null;
    errors?: Array<{
      __typename?: 'ApplicationError';
      code: string;
      description: string;
      type: ErrorType;
      fieldName?: string | null;
      message: string;
    }> | null;
  };
};

export type DeactivateSupplierMutationVariables = Exact<{
  input: DeactivateSupplierInput;
}>;

export type DeactivateSupplierMutation = {
  __typename?: 'Mutation';
  deactivateSupplier: {
    __typename?: 'DeactivateSupplierPayload';
    boolean?: boolean | null;
    errors?: Array<{
      __typename?: 'ApplicationError';
      code: string;
      description: string;
      type: ErrorType;
      fieldName?: string | null;
      message: string;
    }> | null;
  };
};

export type SuppliersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<SupplierFilterInput>;
  order?: InputMaybe<Array<SupplierSortInput> | SupplierSortInput>;
}>;

export type SuppliersQuery = {
  __typename?: 'Query';
  suppliers?: {
    __typename?: 'SuppliersConnection';
    totalCount: number;
    nodes?: Array<
      { __typename?: 'Supplier' } & {
        ' $fragmentRefs'?: { SupplierFieldsFragment: SupplierFieldsFragment };
      }
    > | null;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  } | null;
};

export type SupplierDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type SupplierDetailsQuery = {
  __typename?: 'Query';
  supplierById?:
    | ({
        __typename?: 'Supplier';
        addresses: Array<
          { __typename?: 'Address' } & {
            ' $fragmentRefs'?: { SupplierAddressFieldsFragment: SupplierAddressFieldsFragment };
          }
        >;
      } & { ' $fragmentRefs'?: { SupplierFieldsFragment: SupplierFieldsFragment } })
    | null;
};

export type OnSupplierRegisteredSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnSupplierRegisteredSubscription = {
  __typename?: 'Subscription';
  onSupplierRegistered: { __typename?: 'Supplier' } & {
    ' $fragmentRefs'?: { SupplierFieldsFragment: SupplierFieldsFragment };
  };
};

export type OnSupplierDetailsUpdatedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnSupplierDetailsUpdatedSubscription = {
  __typename?: 'Subscription';
  onSupplierDetailsUpdated: { __typename?: 'Supplier' } & {
    ' $fragmentRefs'?: { SupplierFieldsFragment: SupplierFieldsFragment };
  };
};

export type OnSupplierDeactivatedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnSupplierDeactivatedSubscription = {
  __typename?: 'Subscription';
  onSupplierDeactivated: { __typename?: 'SupplierDeactivatedPayload'; id: string };
};

export type CountriesQueryVariables = Exact<{ [key: string]: never }>;

export type CountriesQuery = {
  __typename?: 'Query';
  countries: Array<{ __typename?: 'Country'; code: Alpha3Code; name: string }>;
};

export const ArticleFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ArticleFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sellingUnit' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ArticleFieldsFragment, unknown>;
export const ArticleDetailsFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ArticleDetailsFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sellingUnit' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'suppliers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ArticleDetailsFieldsFragment, unknown>;
export const CustomerFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Customer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomerFieldsFragment, unknown>;
export const CustomerAddressFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerAddressFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'street' } },
          { kind: 'Field', name: { kind: 'Name', value: 'number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomerAddressFieldsFragment, unknown>;
export const SupplierFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SupplierFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Supplier' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SupplierFieldsFragment, unknown>;
export const SupplierAddressFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SupplierAddressFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'street' } },
          { kind: 'Field', name: { kind: 'Name', value: 'number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SupplierAddressFieldsFragment, unknown>;
export const RegisterArticleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'registerArticle' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RegisterArticleInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerArticle' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'article' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArticleFields' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ApplicationError' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fieldName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ArticleFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sellingUnit' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterArticleMutation, RegisterArticleMutationVariables>;
export const UpdateArticleDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateArticleDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateArticleDetailsInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateArticleDetails' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'article' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArticleFields' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ApplicationError' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fieldName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ArticleFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sellingUnit' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateArticleDetailsMutation, UpdateArticleDetailsMutationVariables>;
export const DiscontinueArticleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'discontinueArticle' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DiscontinueArticleInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'discontinueArticle' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'boolean' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ApplicationError' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fieldName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DiscontinueArticleMutation, DiscontinueArticleMutationVariables>;
export const LinkToSupplierDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'linkToSupplier' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'LinkToSupplierInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'linkToSupplier' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'article' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArticleFields' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'suppliers' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'nodes' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ApplicationError' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fieldName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ArticleFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sellingUnit' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LinkToSupplierMutation, LinkToSupplierMutationVariables>;
export const UnlinkFromSupplierDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'unlinkFromSupplier' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UnlinkFromSupplierInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'unlinkFromSupplier' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'article' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArticleFields' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'suppliers' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'nodes' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ApplicationError' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fieldName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ArticleFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sellingUnit' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UnlinkFromSupplierMutation, UnlinkFromSupplierMutationVariables>;
export const ArticlesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'articles' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ArticleFilterInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ArticleSortInput' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'articles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArticleFields' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ArticleFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sellingUnit' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ArticlesQuery, ArticlesQueryVariables>;
export const ArticleDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ArticleDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'articleById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArticleFields' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'suppliers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nodes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ArticleFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sellingUnit' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ArticleDetailsQuery, ArticleDetailsQueryVariables>;
export const OnArticleRegisteredDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'OnArticleRegistered' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onArticleRegistered' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArticleFields' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ArticleFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sellingUnit' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OnArticleRegisteredSubscription,
  OnArticleRegisteredSubscriptionVariables
>;
export const OnArticleDetailsUpdatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'OnArticleDetailsUpdated' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onArticleDetailsUpdated' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArticleFields' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ArticleFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sellingUnit' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OnArticleDetailsUpdatedSubscription,
  OnArticleDetailsUpdatedSubscriptionVariables
>;
export const OnArticleDiscontinuedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'OnArticleDiscontinued' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onArticleDiscontinued' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OnArticleDiscontinuedSubscription,
  OnArticleDiscontinuedSubscriptionVariables
>;
export const RegisterCustomerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'registerCustomer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RegisterCustomerInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerCustomer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'customer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CustomerFields' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ApplicationError' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fieldName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Customer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterCustomerMutation, RegisterCustomerMutationVariables>;
export const UpdateCustomerDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateCustomerDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateCustomerDetailsInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCustomerDetails' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'customer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CustomerFields' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ApplicationError' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fieldName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Customer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCustomerDetailsMutation, UpdateCustomerDetailsMutationVariables>;
export const DeactivateCustomerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deactivateCustomer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DeactivateCustomerInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deactivateCustomer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'boolean' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ApplicationError' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fieldName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeactivateCustomerMutation, DeactivateCustomerMutationVariables>;
export const CustomersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'customers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CustomerFilterInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'CustomerSortInput' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CustomerFields' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Customer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomersQuery, CustomersQueryVariables>;
export const CustomerDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CustomerDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customerById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CustomerFields' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CustomerAddressFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Customer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerAddressFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'street' } },
          { kind: 'Field', name: { kind: 'Name', value: 'number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomerDetailsQuery, CustomerDetailsQueryVariables>;
export const OnCustomerRegisteredDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'OnCustomerRegistered' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onCustomerRegistered' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CustomerFields' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Customer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OnCustomerRegisteredSubscription,
  OnCustomerRegisteredSubscriptionVariables
>;
export const OnCustomerDetailsUpdatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'onCustomerDetailsUpdated' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onCustomerDetailsUpdated' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CustomerFields' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Customer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OnCustomerDetailsUpdatedSubscription,
  OnCustomerDetailsUpdatedSubscriptionVariables
>;
export const OnCustomerDeactivatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'OnCustomerDeactivated' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onCustomerDeactivated' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OnCustomerDeactivatedSubscription,
  OnCustomerDeactivatedSubscriptionVariables
>;
export const RegisterSupplierDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'registerSupplier' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RegisterSupplierInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerSupplier' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'supplier' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SupplierFields' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ApplicationError' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fieldName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SupplierFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Supplier' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterSupplierMutation, RegisterSupplierMutationVariables>;
export const UpdateSupplierDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateSupplierDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateSupplierDetailsInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateSupplierDetails' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'supplier' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SupplierFields' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ApplicationError' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fieldName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SupplierFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Supplier' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateSupplierDetailsMutation, UpdateSupplierDetailsMutationVariables>;
export const DeactivateSupplierDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deactivateSupplier' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DeactivateSupplierInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deactivateSupplier' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'boolean' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ApplicationError' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fieldName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeactivateSupplierMutation, DeactivateSupplierMutationVariables>;
export const SuppliersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'suppliers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SupplierFilterInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'SupplierSortInput' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'suppliers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SupplierFields' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SupplierFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Supplier' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SuppliersQuery, SuppliersQueryVariables>;
export const SupplierDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SupplierDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'supplierById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SupplierFields' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'SupplierAddressFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SupplierFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Supplier' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SupplierAddressFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'street' } },
          { kind: 'Field', name: { kind: 'Name', value: 'number' } },
          { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SupplierDetailsQuery, SupplierDetailsQueryVariables>;
export const OnSupplierRegisteredDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'OnSupplierRegistered' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onSupplierRegistered' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SupplierFields' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SupplierFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Supplier' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OnSupplierRegisteredSubscription,
  OnSupplierRegisteredSubscriptionVariables
>;
export const OnSupplierDetailsUpdatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'OnSupplierDetailsUpdated' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onSupplierDetailsUpdated' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SupplierFields' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SupplierFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Supplier' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'website' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
          { kind: 'Field', name: { kind: 'Name', value: 'bic' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OnSupplierDetailsUpdatedSubscription,
  OnSupplierDetailsUpdatedSubscriptionVariables
>;
export const OnSupplierDeactivatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'OnSupplierDeactivated' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onSupplierDeactivated' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OnSupplierDeactivatedSubscription,
  OnSupplierDeactivatedSubscriptionVariables
>;
export const CountriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Countries' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CountriesQuery, CountriesQueryVariables>;
