import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export async function saveScore(data: defs.ScoreSaveRequest, axiosOptions: AxiosRequestConfig = {}) {
    const requestOptions = Object.assign<AxiosRequestConfig, AxiosRequestConfig>(
        {
            baseURL: `http://localhost:8080`,
            url: `/api/score`,
            method: 'POST',
            data,
            headers: { 'Content-Type': 'application/json' },
        },
        axiosOptions,
    );
    return axios.request<void>(requestOptions);
}

export async function getTopTenScores(
    query = {},
    axiosOptions: AxiosRequestConfig = {},
) {
    const requestOptions = Object.assign<AxiosRequestConfig, AxiosRequestConfig>(
        {
            baseURL: `http://localhost:8080`,
            url: `/api/topTenScores`,
            method: 'GET',
            params: query,
            paramsSerializer: function (query) {
                return qs.stringify(query, { arrayFormat: 'comma' });
            },
        },
        axiosOptions,
    );
    return await axios.request<number[]>(requestOptions);
}