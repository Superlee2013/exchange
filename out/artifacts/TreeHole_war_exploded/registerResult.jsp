<%--<%@ page import="com.opensymphony.xwork2.util.ValueStack" %>--%>
<%--
  Created by IntelliJ IDEA.
  User: Superlee
  Date: 2015/11/3
  Time: 22:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
    <title></title>
</head>
<body>
注册成功！<br>
  用户名：${username}
  密码：  ${password}
</form>

<s:debug></s:debug>
<%--<%--%>
   <%--ValueStack vs= (ValueStack) request.getAttribute("struts.valueStack");--%>
   <%--out.println(vs);--%>
 <%--%>--%>
</body>
</html>
