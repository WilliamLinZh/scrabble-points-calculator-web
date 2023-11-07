import { act, renderHook } from '@testing-library/react-hooks';
import { API } from '../../../../src/api';
import { usePointCalculator } from './usePointCalculator';

jest.mock('../../../../src/api');

describe('#usePointCalculator', () => {

    const mockSaveScoreRequest = API.scoreController.saveScore as jest.Mock;
    const mockViewTopScoresRequest = API.scoreController.getTopTenScores as jest.Mock;

    it('should get notification message and open popup when call saveScore', async () => {
        mockSaveScoreRequest.mockResolvedValueOnce({
            status: 204,
            data: { message: 'Score Saved.' } ,
        } as any);

        const { result } = renderHook(() => usePointCalculator());

        await act(async () => {
            await result.current.saveScore();
        });

        expect(mockSaveScoreRequest).toBeCalledTimes(1);
        expect(result.current.notification).toEqual({'title':'Score Saved'});
        expect(result.current.open).toEqual(true);
    });

    it('should get top 10 scores and open popup when call viewTopScores', async () => {
        mockViewTopScoresRequest.mockResolvedValueOnce({
            status: 200,
            data:  [36,35,28,21,20,8],
        } as any);

        const { result } = renderHook(() => usePointCalculator());

        await act(async () => {
            await result.current.viewTopScores();
        });

        expect(mockViewTopScoresRequest).toBeCalledTimes(1);
        expect(result.current.notification).toEqual({'title':'Top 10 Scores:', 'message': [36,35,28,21,20,8]});
        expect(result.current.open).toEqual(true);
    });
});
