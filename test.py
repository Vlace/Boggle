from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        """Run before other tests."""

        self.client = app.test_client()
        app.config['TESTING'] = True
    
    def test_homepage(self):
        """Board and other info is displayed"""

        with self.client:
            response = self.client.get('/')
            html = response.get_data(as_text=True)
            self.assertIn('current_board', session)
            self.assertIn('<h2 id="score">Your current score: 0</h2>', html)
            self.assertIn('<h2 id="timer">', html)
    def test_redirect(self):
        """Tests the redirect to the stats page after game is finished"""
        with app.test_client() as client:
            resp = client.get("/finished_game")

            self.assertEqual(resp.status_code, 302)
            self.assertIn(resp.location, "http://localhost/stats")
    def test_stats(self):
        """Tests the stats page to make sure they are loaded correct"""
        with self.client:
            response = self.client.get("/stats")
            html = response.get_data(as_text=True)
            self.assertIn('<p class="avgScore">Your average score is:</p>', html)
            self.assertIn('<button id="return_home">Start new game</button>', html)