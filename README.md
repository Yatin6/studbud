# Iteration based on feedback and further self-reflection

1. **The music player:** 

   *Before:*

   ![image-20220604124134259](.\README.assets\image-20220604124134259.png)

   Feedback: When my participants looking at the old version of the music player, they said that they have no idea about how long had the current song played as well as its progress. On the other hand, two participants mentioned that it looks a little bit disharmonious on the bar. 

   Self-reflection: The first thing I need to solved is to figure out a way adding a progress bar inside the music player. From the perspective of the layout, I felt the buttons occupy too many spaces, which makes the song information less visible to users. And the white background leaves too much contrast to eyes. I think that's the reason why user felt it disharmonious.

   *After:*

   ![image-20220604124313914](.\README.assets\image-20220604124313914.png)

   

2. **The Kanban board card**: This is my initial design of the Kanban board card. User can directly click on the corresponding input to fill in the task information.  

   *Before:* 

   ![image-20220604104511399](.\README.assets\image-20220604104511399.png)

   Feedback: According to the feedback from the user testing, 3/6 participants felt this interaction mode was weird as the card almost remained unchanged before and after they finish filling the information and save it. 

   Self-reflection: I agreed with them. I thought what I did inappropriately was I put too many functions on a single card (user input, delete, edit, save and display), which increases the user's mental mode burden. I think I should divide the process into two parts: a form allows the user to input information first and then, display the information on a "card" and allow the user to edit and delete the card.

   

   *After:*

   ​                                                                                                      First step: fill in the input form

   ![image-20220604122623048](.\README.assets\image-20220604122623048.png)

   ​						 Second step: display the information on a card and user can edit or delete the card by clicking the ellipse on the right

   ![image-20220604104930333](.\README.assets\image-20220604104930333.png)

   ​                                                                The task information will still be there when user wants to edit the card.

   ![image-20220604123459433](.\README.assets\image-20220604123459433.png)

3. **Enter the corresponding task page by double clicking on the card**

   *Before:*

   ![image-20220604135149523](.\README.assets\image-20220604135149523.png)

   Feedback: Most of my participants didn't aware that they could enter a specific page by doubling clicking on the card. Because there are no any clues telling them to do that.

   Self-reflection:  My initial solution was setting the cursor to pointer when the user hover on the card to tell them that it's clickable. However, it leads to another issue: when the user hovers on the ellipse, the cursor remained unchanged. So the user may don't know it's clickable in first time. On the other hand, using the pointer is not intuitive to tell the user to double click. It's more like saying clicking once. Finally, I changed the background color deeper when the user hover on the card, which could more likely to trigger the double clicking action.

   *After:*

   ![image-20220604134922404](.\README.assets\image-20220604134922404.png)

   

4. **The "subtask circle"** 

   *Before:*

<img src=".\README.assets\image-20220604104138483.png" alt="image-20220604104138483" style="zoom:150%;" />

Feedback: Three participants thought the subtask name is less conspicuous and they don't want to see how many steps they've been through. Because as the step number increase, they will feel the task is really complicated and want to give up.

Self-reflection: The step number won't be displayed now. And I think the reason why the user feel the subtask name is not conspicuous is its low font-weight, and the "Complete" button is too big. On the other hand, a horizontal line has been added under the title to help the user distinguish the section.

​       *After:*

<img src=".\README.assets\image-20220604142951802.png" alt="image-20220604142951802" style="zoom: 67%;" />

5. **The timer:**

   *Before:*

   ![image-20220604151058630](.\README.assets\image-20220604151058630.png)

   Feedback: Five participants said that they won't click the restart button when they are studying. 

   Self-reflection:  I think their words make sense. On the other hand, there also no way for the user to turn to the next pomodoro session if they want to. So I replace the restart button with the skip button.

   

   After: 

   ![image-20220604151118479](.\README.assets\image-20220604151118479.png)



6. **Reading list ellipse**

​	*Before:*

<img src=".\README.assets\image-20220604104110701.png" alt="image-20220604104110701"/>

​	Feedback: The pop up menu will hinder the ellipse in the next line.

​	Self-reflection: The position of the pop up menu could be moved to the right of the ellipse to solve the issue simply.

​    After:* 

![image-20220604190556234](README.assets/image-20220604190556234.png)



7. **Reading list input form**

   *Before:*

   <img src=".\README.assets\image-20220604104036525.png" alt="image-20220604104036525"  />

   

   feedback: Three participants said the function of the input form is fine. However, this input form together with two buttons looks a little bit seprerate from each other.

   Self-reflection: I think this is because I didn't add a border or background to the input form area to tell the user that they are an entity. As a result, a light grey background has been added.

   

   *After:* 

   <img src=".\README.assets\image-20220604151858986.png" alt="image-20220604151858986" style="zoom: 50%;" />

   

8. Fix the Improve the user experience, such as add the white area when the user hovering on the menu items and the mouse won’t become pointer when the user hover on the icons on the card, as they are unclickable.
