/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	BillingInfoTbl = "billing_info_tbl",
	BillingInfoUtilitiesDateTbl = "billing_info_utilities_date_tbl",
	BillingTbl = "billing_tbl",
	RoomsTbl = "rooms_tbl",
	ScheduleTbl = "schedule_tbl",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type BillingInfoTblRecord = {
	billing_id?: RecordIdString
	created?: IsoDateString
	id: string
	room_info?: RecordIdString
	updated?: IsoDateString
	utilities?: RecordIdString[]
}

export enum BillingInfoUtilitiesDateTblUtilityTypeOptions {
	"water" = "water",
	"electricity" = "electricity",
}
export type BillingInfoUtilitiesDateTblRecord = {
	created?: IsoDateString
	from?: IsoDateString
	id: string
	room_id?: RecordIdString
	to?: IsoDateString
	total: number
	updated?: IsoDateString
	utility_type?: BillingInfoUtilitiesDateTblUtilityTypeOptions
}

export type BillingTblRecord = {
	billing_info_id?: RecordIdString
	created?: IsoDateString
	deadline: IsoDateString
	id: string
	to?: RecordIdString
	updated?: IsoDateString
}

export type RoomsTblRecord = {
	bldg_number: number
	capacity: number
	created?: IsoDateString
	floor_number: number
	id: string
	price: number
	unit_name: string
	updated?: IsoDateString
}

export enum ScheduleTblPurposeOptions {
	"maintenace" = "maintenace",
	"reservation" = "reservation",
}
export type ScheduleTblRecord = {
	created?: IsoDateString
	description?: string
	id: string
	maintenance_price?: number
	purpose?: ScheduleTblPurposeOptions
	room?: RecordIdString
	scheduled_date?: IsoDateString
	updated?: IsoDateString
	user?: RecordIdString
}

export enum UsersRoleOptions {
	"landlord" = "landlord",
	"tenant" = "tenant",
	"maintenance" = "maintenance",
}
export type UsersRecord = {
	age?: number
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	files?: string[]
	firstname?: string
	id: string
	lastname?: string
	middlename?: string
	password: string
	role?: UsersRoleOptions
	rooms?: RecordIdString[]
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type BillingInfoTblResponse<Texpand = unknown> = Required<BillingInfoTblRecord> & BaseSystemFields<Texpand>
export type BillingInfoUtilitiesDateTblResponse<Texpand = unknown> = Required<BillingInfoUtilitiesDateTblRecord> & BaseSystemFields<Texpand>
export type BillingTblResponse<Texpand = unknown> = Required<BillingTblRecord> & BaseSystemFields<Texpand>
export type RoomsTblResponse<Texpand = unknown> = Required<RoomsTblRecord> & BaseSystemFields<Texpand>
export type ScheduleTblResponse<Texpand = unknown> = Required<ScheduleTblRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	billing_info_tbl: BillingInfoTblRecord
	billing_info_utilities_date_tbl: BillingInfoUtilitiesDateTblRecord
	billing_tbl: BillingTblRecord
	rooms_tbl: RoomsTblRecord
	schedule_tbl: ScheduleTblRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	billing_info_tbl: BillingInfoTblResponse
	billing_info_utilities_date_tbl: BillingInfoUtilitiesDateTblResponse
	billing_tbl: BillingTblResponse
	rooms_tbl: RoomsTblResponse
	schedule_tbl: ScheduleTblResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'billing_info_tbl'): RecordService<BillingInfoTblResponse>
	collection(idOrName: 'billing_info_utilities_date_tbl'): RecordService<BillingInfoUtilitiesDateTblResponse>
	collection(idOrName: 'billing_tbl'): RecordService<BillingTblResponse>
	collection(idOrName: 'rooms_tbl'): RecordService<RoomsTblResponse>
	collection(idOrName: 'schedule_tbl'): RecordService<ScheduleTblResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}