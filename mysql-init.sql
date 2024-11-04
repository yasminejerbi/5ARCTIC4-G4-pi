ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'anasanas';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'anasanas';
FLUSH PRIVILEGES;
