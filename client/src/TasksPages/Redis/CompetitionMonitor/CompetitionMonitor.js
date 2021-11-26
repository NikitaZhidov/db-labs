import { Button, LinearProgress, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { sportApi } from '../../../api/sport.api';
import { useFetching } from '../../../hooks/useFetching';
import Select from 'react-select';

const getOptionsItem = (text) => ({ label: text, value: text });

export const CompetitionMonitor = () => {
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [selectedSportsman, setSelectedSportsman] = useState(null);

  const [judges, setJudges] = useState([]);
  const [sportsmans, setSportsmans] = useState([]);
  const [sportsmansWithRating, setSportsmansWithRating] = useState([]);

  const [fetchingJudges, isLoadingJudges] = useFetching(async () => {
    const judges = await sportApi.getAllJudges();
    const judgesToSet = judges.map(getOptionsItem);
    setJudges(judgesToSet);
    setSelectedJudge(judgesToSet[0]);
  });
  const [fetchingSportsmans, isLoadingSportsmans] = useFetching(async () => {
    const sportsmans = await sportApi.getAllSportsmans();
    const sportsmansToSet = sportsmans.map(getOptionsItem);
    setSportsmans(sportsmansToSet);
    setSelectedSportsman(sportsmansToSet[0]);
  });

  const [fetchingSportsmansWithRating, isLoadingSportsmansWithRating] =
    useFetching(async () => {
      const sportsmansWithRating = await sportApi.getAllSportsmansWithRating();
      setSportsmansWithRating(sportsmansWithRating);
    });

  const [pointsToAdd, setPointsToAdd] = useState(0);

  useEffect(() => {
    fetchingSportsmans();
    fetchingJudges();
    fetchingSportsmansWithRating();
  }, []);

  const addPoints = useCallback(async () => {
    if (selectedJudge && selectedSportsman) {
      const judge = selectedJudge.value;
      const sportsman = selectedSportsman.value;
      const points = pointsToAdd;
      await sportApi.addPointsToSpotsman(judge, sportsman, points);
      fetchingSportsmansWithRating();
    }
  }, [selectedJudge, selectedSportsman, pointsToAdd, judges]);

  return (
    <>
      {isLoadingSportsmansWithRating ? (
        <LinearProgress />
      ) : (
        <div
          style={{
            marginBottom: '35px',
            border: '1px solid #e2e2e2',
            borderRadius: '5px',
            padding: '0 5px',
            fontFamily: 'Roboto',
          }}
        >
          {sportsmansWithRating
            .sort((s1, s2) => s2.points - s1.points)
            .map((s, i) => (
              <div
                key={`${i}_${s.points}_${s.sportsmans}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '5px 0 20px',
                  padding: '10px',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #e2e2e2',
                }}
              >
                <div>
                  {i + 1}) {s.sportsman}
                </div>
                <div>{s.points}</div>
              </div>
            ))}
        </div>
      )}
      {!isLoadingJudges && (
        <>
          <Typography
            style={{ textAlign: 'center', margin: '20px 0' }}
            variant="h4"
            component="h4"
          >
            Судья
          </Typography>
          <Select
            options={judges}
            onChange={setSelectedJudge}
            defaultValue={judges[0]}
          />
        </>
      )}

      {!isLoadingSportsmans && (
        <>
          <Typography
            style={{ textAlign: 'center', margin: '20px 0' }}
            variant="h4"
            component="h4"
          >
            Спортсмен
          </Typography>
          <Select
            options={sportsmans}
            onChange={setSelectedSportsman}
            defaultValue={sportsmans[0]}
          />
        </>
      )}

      {!isLoadingSportsmans && !isLoadingJudges && (
        <>
          <Typography
            style={{ textAlign: 'center', margin: '20px 0' }}
            variant="h4"
            component="h4"
          >
            Добавить баллы
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={pointsToAdd}
            onChange={(e) => setPointsToAdd(e.target.value)}
          />
          <Button
            onClick={addPoints}
            variant="contained"
            style={{ marginTop: '15px' }}
          >
            Добавить
          </Button>
        </>
      )}
    </>
  );
};
