צרי מסד נתונים ב MongoDB שמכיל בתוכו לפחות 4 collections, הכוללים:
•	מסמכים שמכילים embedded documents – עבור קשר של יחיד ליחיד
•	References בין collections – קשר של יחיד לרבים וקשר של רבים לרבים
צרי שאילתות עבור:
•	הוספת documents חדשים

•	שליפת documents ע"י:
o	ערכים של שדות רגילים
o	ערכים של שדות ב embedded documents
o	ערכים של שדות בתוך מערך

•	עדכון documents:
o	הוספת איברים למערך בתוך מסמך
o	עדכון אובייקט במערך 
o	עדכון (או שליפה) ערך של מסמך במידה והוא עונה על תנאי מסוים 

•	מחיקת מסמך עפ"י תנאי מסוים
צרי אגריגציות:
•	3 אגריגציות שכוללות בתוכן שליפה/מיון/קיבוץ/הצגת שדות מסוימים/ייצוא לאוסף אחר...
•	2 lookup
ניתן לשלב בין שתי הסעיפים...
שימי לב: בעת בניית ה database הגדירי לעצמך מה הן השאילתות והאגריגציות שמתאימות ורלוונטיות עבור database זה...
