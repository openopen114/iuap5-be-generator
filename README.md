##  Generate entity & XML 

#### Live demo: [https://openopen114.github.io/iuap5-be-generator/](https://openopen114.github.io/iuap5-be-generator/)



#### Table Schema Example:

```sql
 [CREATE_TIME] 	 [VARCHAR]  
 [CREATE_USER] 	 [VARCHAR]  
 [LAST_MODIFIED] 	 [VARCHAR]  
 [LAST_MODIFY_USER] 	 [VARCHAR] 
 [BPM_STATE] 	 [DECIMAL]  
 [TS] 	 [VARCHAR] 
 [DR] 	 [DECIMAL]  
 [TENANT_ID] 	 [VARCHAR]  
 [ID] 	 [CHAR]  
 [CODE] 	 [VARCHAR]  
 [DESCRIPTION] 	 [NVARCHAR]  
 [BUCKET_NO] 	 [INT]  
```



create by 

```sql
SELECT UPPER(CONCAT('[', COLUMN_NAME, ']')) AS COLUMN_NAME,
       UPPER(CONCAT('[', DATA_TYPE, ']')) AS DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'YOUR-TABLE-NAME';
```

