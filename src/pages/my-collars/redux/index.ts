import { baseUrl, headers } from '@/config/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'
type Collar = {
    data: any
}

interface CollarsState {
    data: Collar[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    collar: Collar;
}

export const fetchCollarsData = createAsyncThunk<Collar[]>(
    'collars/fetchCollarsData',
    async () => {
        
        const response = await fetch(`${baseUrl}/data?qty=3`, { headers });

        if (!response.ok) {
            throw new Error('Failed to fetch collars data');
        }
        const data = await response.json();
        return data;
    },
);

export const fetchCollar = async ({ id }: { id?: number }) => {
    const response = await fetch(`${baseUrl}/collars/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch comapny data');
    }
    const data = await response.json();
    return data;
};
const collarsSlice = createSlice({
    name: 'collars',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        collar: {} as Collar,
    } as CollarsState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchCollarsData.pending, (state: CollarsState) => {
                state.status = 'loading';
            })
            .addCase(
                fetchCollarsData.fulfilled,
                (state: CollarsState, action: PayloadAction<Collar[]>) => {
                    state.status = 'succeeded';
                    state.data = action.payload;
                },
            )
            .addCase(
                fetchCollarsData.rejected,
                (state: CollarsState, action: PayloadAction<string>) => {
                    state.status = 'failed';
                    state.error = action.payload;
                },
            );
    },
});

const selectCompaniesData = (state: RootState) => state.collars.data;
const selectCompaniesStatus = (state: RootState) => state.collars.status;
const selectCompaniesError = (state: RootState) => state.collars.error;

const CollarsData = () => {
    const data = useSelector(selectCompaniesData);
    const status = useSelector(selectCompaniesStatus);
    const error = useSelector(selectCompaniesError);
    return {
        data,
        status,
        error,
    };
};

export default collarsSlice.reducer;

export { CollarsData };