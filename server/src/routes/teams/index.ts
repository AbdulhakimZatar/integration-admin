import { Router } from 'express';
import teams from '../../models/teams';
const router = Router();

router.get('/', async (req, res) => {
  const results = await teams.getTeams();
  res.json({
    results,
  });
});

router.get('/:name', async (req, res) => {
  const { name } = req.params;

  const results = await teams.getTeam(name);

  if (!results) {
    res.status(404).json({
      message: 'Team not found',
    });
  } else {
    res.json({
      results,
    });
  }
});

router.post('/:name', async (req, res, next) => {
  const { name } = req.params;

  try {
    const results = await teams.createTeam(name);
    res.status(201).json({
      results,
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:name', async (req, res, next) => {
  const { name } = req.params;

  try {
    const results = await teams.deleteTeam(name);
    res.json({
      results,
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/:name', async (req, res, next) => {
  const { name } = req.params;
  const payload = req.body;

  try {
    const results = await teams.updateTeam(name, payload);
    res.json({
      results,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
