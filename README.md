# simplecalendar
Hootsuite interview


Instructions:
1. git clone repo
2. run npm install
3. run with command 'node index.js'
4. check https://localhost:3000

Functional Test Plan:

1. Adding event works
Event 1: Birthday Party
Date: 2019-03-05
Start Time: 5:00 PM
End Time: 10:00 PM
Clicking add event --> successful
Clicking get events --> shows event

2. Adding event that starts earlier and ends during prior event ends doesn't work
Event 2: Soccer
Date: 2019-03-05
Start Time: 4:00 PM
End Time: 6:00 PM
Clicking add event --> unsuccessful
Clicking get events --> event not shown

3. Adding event that starts during prior event doesn't work
Event 3: Avengers Movie
Date: 2019-03-05
Start Time: 8:00 PM
End Time: 11:00 PM
Clicking add event --> unsuccessful
Clicking get events --> event not shown

4. Adding event at same time doesnt work
Event 4: Anniversary
Date: 2019-03-05
Start Time: 5:00 PM
End Time: 10:00 PM
Clicking add event --> unsuccessful
Clicking get events --> event not shown

5. Adding event right after/before event works
Event 4: Game of Thrones Viewing
Date: 2019-03-05
Start Time: 10:01 PM
End Time: 11:00 PM
Clicking add event --> successful
Clicking get events --> event shown

5. Adding event different day at same time works
Event 4: Mom's Birthday
Date: 2019-08-21
Start Time: 5:00 PM
End Time: 10:00 PM
Clicking add event --> successful
Clicking get events --> event shown

6. Cannot submit event without name, date, start time, and end time
