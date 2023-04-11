import { baseUrl, headers } from '@/config/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'
type Collar = {
    data: any
}

interface CollarsState {
    // data: Collar[];
    data: {
        result: any
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: boolean | null;
    collar: Collar;
}

export const fetchCollarsData = createAsyncThunk<Collar[]>(
    'collars/fetchCollarsData',
    async () => {
        try {
            const response = await fetch(`${baseUrl}/data?qty=1`, { headers });
            const data = await response.json();
            return data.result[0].location.coordinates
        } catch (error) {
            throw new Error('Failed to fetch collars data');
        }
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
        data: {},
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
                (state: CollarsState, action: PayloadAction<any>) => {
                    state.status = 'succeeded';
                    state.data = action.payload;
                },
            )
            .addCase(
                fetchCollarsData.rejected,
                (state: CollarsState, action: PayloadAction<string>) => {
                    state.status = 'failed';
                    state.error = true;
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