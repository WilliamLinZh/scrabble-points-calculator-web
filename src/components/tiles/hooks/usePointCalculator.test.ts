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
        expect(result.current.notification).toEqual({'title':'Top 10 Scores', 'message': [36,35,28,21,20,8]});
        expect(result.current.open).toEqual(true);
    });

    it('should get score 1 when type e', async () => {
        const { result } = renderHook(() => usePointCalculator());

        await act(async () => {
            var event = new KeyboardEvent('keydown', {'key': 'e'});
            document.dispatchEvent(event);
        });
        expect(result.current.chars[0]).toEqual('e');
        expect(result.current.score).toEqual(1);
    });

    it('should get score 18 when type exciting', async () => {
        const { result } = renderHook(() => usePointCalculator());

        await act(async () => {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'x'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'c'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'i'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'i'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'n'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'g'}));
        });
        expect(result.current.chars).toEqual(['e','x','c','i','t','i','n','g']);
        expect(result.current.score).toEqual(18);
    });

    it('should get score 18 when type excitingg and backspace', async () => {
        const { result } = renderHook(() => usePointCalculator());

        await act(async () => {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'x'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'c'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'i'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'i'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'n'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'g'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'g'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Backspace'}));
        });
        expect(result.current.chars).toEqual(['e','x','c','i','t','i','n','g']);
        expect(result.current.score).toEqual(18);
    });

    it('should get score 34 when type rgpykxz', async () => {
        const { result } = renderHook(() => usePointCalculator());

        await act(async () => {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'r'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'g'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'p'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'y'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'k'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'x'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'z'}));
        });
        expect(result.current.chars).toEqual(['r','g','p','y','k','x','z']);
        expect(result.current.score).toEqual(34);
    });

    it('should get score 0 when type 01234@/', async () => {
        const { result } = renderHook(() => usePointCalculator());

        await act(async () => {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': '0'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': '1'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': '2'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': '3'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': '4'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': '@'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': '/'}));
        });
        expect(result.current.chars).toEqual(['0','1','2','3','4','@','/']);
        expect(result.current.score).toEqual(0);
    });

    it('should get score 0 when type exciting and call resetTiles', async () => {
        const { result } = renderHook(() => usePointCalculator());

        await act(async () => {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'x'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'c'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'i'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'i'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'n'}));
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'g'}));
            await result.current.resetTiles();
        });
        expect(result.current.chars).toEqual([]);
        expect(result.current.score).toEqual(0);
    });
});
