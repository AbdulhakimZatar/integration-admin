import { Router } from 'express';
import validation from '../../middleware/validation';
import teams from '../../models/teams';
import { teamSchema } from './validation';
const router = Router();

router.get('/', async (req, res) => {
  const results = await teams.getTeams();
  res.json(results);
});

router.get('/:name', validation(teamSchema, 'params'), async (req, res) => {
  const { name } = req.params;

  const results = await teams.getTeam(name);

  if (!results) {
    res.status(404).json({
      error: 'Team not found',
    });
  } else {
    res.json(results);
  }
});

router.post('/:name', validation(teamSchema, 'params'), async (req, res, next) => {
  const { name } = req.params;

  try {
    const results = await teams.createTeam(name);
    res.status(201).json(results);
  } catch (err) {
    next(err);
  }
});

router.delete('/:name', validation(teamSchema, 'params'), async (req, res, next) => {
  const { name } = req.params;

  try {
    const results = await teams.deleteTeam(name);
    res.status(202).json(results);
  } catch (err) {
    next(err);
  }
});

export default router;
