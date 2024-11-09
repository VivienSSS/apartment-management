
export type Room = {
    id:number;
    letter:string;
    floor:number;
    status: 'occupied' | 'vacant';
    rentAmount:number;
    buildingID:number;
}

export type Tenant = {
    id:number;
    firstName:string;
    lastName:string;
    contactNumber:string;
    email:string;
    leaseStartDate:Date;
    leaseEndDate:Date;
    unitID:number;
}

export type Payment = {
    id:number;
    paymentDate:Date;
    amount:number;
    paymentMethod:number;
    tenantID:number;
}

export type Maintenance = {
    id:number;
    requestDate:Date;
    status: 'completed' | 'ongoing' | 'scheduled';
    description:string;
    unitID:number;
    tenantID:number;
}