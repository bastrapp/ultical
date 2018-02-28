package de.ultical.backend.services.impl;

import java.math.BigInteger;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.ultical.backend.exception.IBANValidationException;
import de.ultical.backend.services.IBANValidationService;

public class IBANValidationServiceImpl implements IBANValidationService {

	public static enum IBANCountryEnum {
		DE("DE", 22), AT("AT", 20), CH("CH", 21), FR("FR", 27), LU("LU", 20), BE("BE", 16), NL("NL", 18), GB("GB",
				22), DK("DK", 18), PL("PL", 28), CZ("CZ", 24);

		private final String countryCode;
		private final int length;

		IBANCountryEnum(final String cc, final int length) {
			this.countryCode = cc;
			this.length = length;
		}

		public String getCountryCode() {
			return this.countryCode;
		}

		public int getLength() {
			return this.length;
		}
	}

	private static String mapCharToInt(final char c) {
		String result;
		if (c >= '0' && c <= '9') {
			result = String.valueOf(c);
		} else if (c >= 'A' && c <= 'Z') {
			result = String.valueOf(c - 'A' + 10);
		} else {
			throw new IllegalArgumentException("invalid character " + c + " in iban");
		}
		return result;
	}

	private static final String IBAN_LENGTH_MISMATCH_MESSAGE = "IBAN-length does not match country code";
	private static final Logger LOG = LoggerFactory.getLogger(IBANValidationServiceImpl.class);
	private static final BigInteger IBAN_MOD_CONSTANT = new BigInteger("97");

	@Override
	public void validateIBAN(final String iban) throws IBANValidationException {
		if (iban == null) {
			throw new IBANValidationException("NULL is not a valid IBAN");
		}
		this.checkIbanLength(iban);
		this.checkCheckSum(iban);
	}

	private void checkIbanLength(final String iban) throws IBANValidationException {
		try {
			IBANCountryEnum countryEnum = IBANCountryEnum.valueOf(iban.substring(0, 2));
			if (iban.length() != countryEnum.getLength()) {
				throw new IBANValidationException(IBAN_LENGTH_MISMATCH_MESSAGE);
			}
		} catch (IllegalArgumentException iae) {
			LOG.debug("received iban with unknown country code.", iae);
			if (iban.length() < 15 || iban.length() > 34) {
				throw new IBANValidationException(IBAN_LENGTH_MISMATCH_MESSAGE);
			} else {
				LOG.debug(
						"IBAN {} does not belong to a known country. It has been 'validated' as the length is in the acceptable range",
						iban);
			}
		}
	}

	private void checkCheckSum(final String iban) throws IBANValidationException {
		final String reorderedIban = iban.substring(4, iban.length()) + iban.substring(0, 4);
		try {
			String sb = reorderedIban.chars().mapToObj(i -> (char) i)
					.map(c -> IBANValidationServiceImpl.mapCharToInt(c)).collect(Collectors.joining());
			final BigInteger bigInt = new BigInteger(sb.toString());
			final BigInteger result = bigInt.mod(IBAN_MOD_CONSTANT);
			if (!BigInteger.ONE.equals(result)) {
				throw new IBANValidationException("the provided IBAN is invalid");
			}
		} catch (IllegalArgumentException iae) {
			throw new IBANValidationException("IBAN contains invalid characters", iae);
		}
	}
}
