package com.example.tests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class haal3 {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", "http://veebirakendus-ut.appspot.com/");
		selenium.start();
	}

	@Test
	public void testHaal3() throws Exception {
		selenium.open("/#Home");
		selenium.click("id=loginbutton");
		selenium.waitForPopUp("null", "30000");
		selenium.selectPopUp("");
		selenium.waitForPageToLoad("30000");
		selenium.deselectPopUp();
		selenium.selectWindow("null");
		selenium.click("link=Kandidaadid");
		selenium.click("id=addvote");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isAlertPresent()) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		assertEquals("Valige kandidaat!", selenium.getAlert());
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isTextPresent("Magd")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.click("xpath=//input[@type='radio' and @value='11']");
		assertTrue(selenium.isChecked("xpath=//input[@type='radio' and @value='11']"));
		selenium.click("id=addvote");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isAlertPresent()) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		assertEquals("Hääl edukalt antud!", selenium.getAlert());
		selenium.click("id=deletevote");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isAlertPresent()) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		assertEquals("Hääl tühistatud!", selenium.getAlert());
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
