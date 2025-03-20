type User = {
    userName: string;
    password: string; 
    journal: Journal[]; 

};

type Journal = {
    day: number;
    month: number;
    year: number;
    activities: Activity[];
};

type Activity = {
    name: string;
    type: string;
    metric: number;
}

export type { User, Journal, Activity }